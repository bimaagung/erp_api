<?php

namespace App\Http\Controllers\API;

use App\Helpers\UploadFile;
use App\Http\Controllers\Controller;
use App\Http\Resources\KaryawanResource;
use App\Http\Resources\PaginationResource;
use App\Models\JobInformation;
use App\Models\Karyawan;
use App\Models\PersonalInformation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class KaryawanController extends Controller
{

    protected Karyawan $karyawan;
    protected PersonalInformation $personalInformation;
    protected JobInformation $jobInformation;
    protected string $cacheKey = 'karyawan';
    protected int $expiration = 60 * 3;

    public function __construct(Karyawan $karyawan, PersonalInformation $personalInformation, JobInformation $jobInformation, Redis $redis)
    {
        $this->karyawan = $karyawan;
        $this->personalInformation = $personalInformation;
        $this->jobInformation = $jobInformation;
    }

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);

        $validator = Validator::make(['per_page' => $perPage], [
            'per_page' => 'numeric',
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $karyawans = Cache::remember($this->cacheKey, $this->expiration, function () use ($perPage) {
            return $this->karyawan->with(['informasiPersonal', 'informasiPekerjaan'])->orderBy('created_at', 'DESC')->paginate($perPage);
        });

        return $this->successWithPaginate(
            new PaginationResource($karyawans),
            KaryawanResource::collection($karyawans),
        );
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'max:112'],
            'nik' => ['required', 'integer', 'unique:karyawans'],
            'ttl' => ['required'],
            'jenis_kelamin' => ['required'],
            'email' => ['required', 'email:rfc,dns', 'unique:karyawans', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'alamat' => ['required'],
            'domisili' => ['required'],
            'pendidikan' => ['required'],
            'agama' => ['required'],
            'tanggal_lahir' => ['required', 'date'],
            'telp' => ['required', 'max:15'],
            'foto' => [
                File::types(['jpg', 'png'])
                    ->max(5 * 1024)
            ],
            'admin' => ['boolean'],

            // Personal Information
            'npwp' => ['required', 'integer', 'unique:informasi_personal'],
            'tipe_pajak',
            'potongan_pajak' => ['integer'],
            'tunjangan_pajak' => ['integer'],
            'nama_bank' => ['required'],
            'nomor_akun_bank' => ['integer', 'unique:informasi_personal'],
            'bpjs_ketenagakerjaan' => ['integer', 'unique:informasi_personal'],
            'bpjs_kesehatan' => ['integer', 'unique:informasi_personal'],

            // Job Information
            'kantor_cabang_id' => ['required', 'integer', 'exists:kantor_cabang,id'],
            'department' => ['required'],
            'jabatan' => ['required'],
            'tanggal_masuk' => ['required', 'date'],
            'status' => ['required'],
            'periode_kontrak' => ['integer'],
            'potongan_terlambat' => ['boolean'],
            'toleransi_keterlambatan' => ['integer'],
            'mode_absensi' => ['required'],
            'absen_diluar_kantor' => ['boolean'],
        ]);

        $validator->setCustomMessages([
            'kantor_cabang_id.exists' => __('branchOffice.not_found'),
            'nik.unique' => __('karyawan.unique_nik'),
            'email.unique' => __('karyawan.unique_email'),
            'npwp.unique' => __('personal_information.unique_npwp'),
            'nomor_akun_bank.unique' => __('personal_information.unique_nomor_akun_bank'),
            'bpjs_ketenagakerjaan.unique' => __('personal_information.unique_bpjs_ketenagakerjaan'),
            'bpjs_kesehatan.unique' => __('personal_information.unique_bpjs_kesehatan'),
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('kantor_cabang_id')) {
                return $this->fail($errors->first('kantor_cabang_id'));
            } else {
                return $this->fail($validator->errors()->first());
            }
        }

        if ($request->hasFile('foto')) {
            $upload = UploadFile::upload($request->file('foto'), 'karyawan');
            if (!$upload) {
                return $this->fail(__('upload.invalid'));
            }
        } else {
            $upload = 'default.jpg';
        }

        try {
            $dbResult = DB::transaction(function () use ($request, $upload) {
                $karyawanResult = $this->karyawan->create([
                    'nama' => $request->nama,
                    'nik' => $request->nik,
                    'ttl' => $request->ttl,
                    'jenis_kelamin' => $request->jenis_kelamin,
                    'email' => $request->email,
                    'alamat' => $request->alamat,
                    'domisili' => $request->domisili,
                    'pendidikan' => $request->pendidikan,
                    'agama' => $request->agama,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'telp' => $request->telp,
                    'foto' => $upload,
                    'admin' => $request->admin,
                ]);

                $personalResult = $this->personalInformation->create([
                    'karyawan_id' => $karyawanResult->id,
                    'npwp' => $request->npwp,
                    'tipe_pajak' => $request->tipe_pajak,
                    'potongan_pajak' => $request->potongan_pajak,
                    'tunjangan_pajak' => $request->tunjangan_pajak,
                    'nama_bank' => $request->nama_bank,
                    'nomor_akun_bank' => $request->nomor_akun_bank,
                    'bpjs_ketenagakerjaan' => $request->bpjs_ketenagakerjaan,
                    'bpjs_kesehatan' => $request->bpjs_kesehatan,
                ]);

                $jobResult = $this->jobInformation->create([
                    'karyawan_id' => $karyawanResult->id,
                    'kantor_cabang_id' => $request->kantor_cabang_id,
                    'department' => $request->department,
                    'jabatan' => $request->jabatan,
                    'tanggal_masuk' => $request->tanggal_masuk,
                    'status' => $request->status,
                    'periode_kontrak' => $request->periode_kontrak,
                    'potongan_terlambat' => $request->potongan_terlambat,
                    'toleransi_keterlambatan' => $request->toleransi_keterlambatan,
                    'mode_absensi' => $request->mode_absensi,
                    'absen_diluar_kantor' => $request->absen_diluar_kantor,
                ]);

                return [
                    'karyawan' => $karyawanResult,
                    'personal' => $personalResult,
                    'job' => $jobResult,
                ];
            }, 5);
        } catch (QueryException $e) {
            DB::rollback();
            Log::error($e);
            throw $e;
        }

        Cache::delete($this->cacheKey);

        $dbResult['karyawan']['informasi_personal'] = $dbResult['personal'];
        $dbResult['karyawan']['informasi_pekerjaan'] = $dbResult['job'];

        return $this->success(new KaryawanResource($dbResult['karyawan']));
    }

    public function findById($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $karyawan = $this->karyawan->with(['informasiPersonal', 'informasiPekerjaan'])->find($id);

        if (!$karyawan) {
            return $this->fail(__('karyawan.not_found'));
        }

        return $this->success(new KaryawanResource($karyawan));
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'max:112'],
            'nik' => ['required', 'integer'],
            'ttl' => ['required'],
            'jenis_kelamin' => ['required'],
            'email' => ['required', 'email:rfc,dns', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'alamat' => ['required'],
            'domisili' => ['required'],
            'pendidikan' => ['required'],
            'agama' => ['required'],
            'tanggal_lahir' => ['required', 'date'],
            'telp' => ['required', 'max:15'],
            'foto' => [
                File::types(['jpg', 'png'])
                    ->max(5 * 1024)
            ],
            'admin' => ['boolean'],

            // Personal Information
            'npwp' => ['required', 'integer'],
            'tipe_pajak',
            'potongan_pajak' => ['integer'],
            'tunjangan_pajak' => ['integer'],
            'nama_bank' => ['required'],
            'nomor_akun_bank' => ['integer'],
            'bpjs_ketenagakerjaan' => ['integer'],
            'bpjs_kesehatan' => ['integer'],

            // Job Information
            'kantor_cabang_id' => ['required', 'integer', 'exists:kantor_cabang,id'],
            'department' => ['required'],
            'jabatan' => ['required'],
            'tanggal_masuk' => ['required', 'date'],
            'status' => ['required'],
            'periode_kontrak' => ['integer'],
            'potongan_terlambat' => ['boolean'],
            'toleransi_keterlambatan' => ['integer'],
            'mode_absensi' => ['required'],
            'absen_diluar_kantor' => ['boolean'],
        ]);

        $validator->setCustomMessages([
            'kantor_cabang_id.exists' => __('branchOffice.not_found'),
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('kantor_cabang_id')) {
                return $this->fail($errors->first('kantor_cabang_id'));
            } else {
                return $this->fail($validator->errors()->first());
            }
        }

        if ($request->hasFile('foto')) {
            $upload = UploadFile::upload($request->file('foto'), 'karyawan');
            if (!$upload) {
                return $this->fail(__('upload.invalid'));
            }
        } else {
            $upload = 'default.jpg';
        }

        try {
            DB::transaction(function () use ($id, $request, $upload) {
                $this->karyawan->where('id', $id)->update([
                    'nama' => $request->nama,
                    'nik' => $request->nik,
                    'ttl' => $request->ttl,
                    'jenis_kelamin' => $request->jenis_kelamin,
                    'email' => $request->email,
                    'alamat' => $request->alamat,
                    'domisili' => $request->domisili,
                    'pendidikan' => $request->pendidikan,
                    'agama' => $request->agama,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'telp' => $request->telp,
                    'foto' => $upload,
                    'admin' => $request->admin,
                ]);

                $this->personalInformation->where('karyawan_id', $id)->update([
                    'npwp' => $request->npwp,
                    'tipe_pajak' => $request->tipe_pajak,
                    'potongan_pajak' => $request->potongan_pajak,
                    'tunjangan_pajak' => $request->tunjangan_pajak,
                    'nama_bank' => $request->nama_bank,
                    'nomor_akun_bank' => $request->nomor_akun_bank,
                    'bpjs_ketenagakerjaan' => $request->bpjs_ketenagakerjaan,
                    'bpjs_kesehatan' => $request->bpjs_kesehatan,
                ]);

                $this->jobInformation->where('karyawan_id', $id)->update([
                    'kantor_cabang_id' => $request->kantor_cabang_id,
                    'department' => $request->department,
                    'jabatan' => $request->jabatan,
                    'tanggal_masuk' => $request->tanggal_masuk,
                    'status' => $request->status,
                    'periode_kontrak' => $request->periode_kontrak,
                    'potongan_terlambat' => $request->potongan_terlambat,
                    'toleransi_keterlambatan' => $request->toleransi_keterlambatan,
                    'mode_absensi' => $request->mode_absensi,
                    'absen_diluar_kantor' => $request->absen_diluar_kantor,
                ]);
            }, 5);
        } catch (QueryException $e) {
            DB::rollback();
            Log::error($e);
            throw $e;
        }

        $karyawan = $this->karyawan->with(['informasiPersonal', 'informasiPekerjaan'])->find($id);

        Cache::delete($this->cacheKey);

        return $this->success(new KaryawanResource($karyawan));
    }

    public function destroy($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'numeric', 'exists:karyawans,id']
        ]);

        $validator->setCustomMessages([
            'id.exists' => __('karyawan.not_found'),
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('id')) {
                return $this->fail($errors->first('id'));
            } else {
                return $this->fail($validator->errors()->first());
            }
        }

        try {
            $dbResult = DB::transaction(function () use ($id) {
                $karyawanResult = $this->karyawan->destroy($id);
                $this->personalInformation->destroy($id);
                $this->jobInformation->destroy($id);
                return [
                    'karyawan' => $karyawanResult,
                ];
            }, 5);
        } catch (QueryException $e) {
            DB::rollback();
            Log::error($e);
            throw $e;
        }

        Cache::delete($this->cacheKey);

        return $this->success($dbResult['karyawan']);
    }
}
