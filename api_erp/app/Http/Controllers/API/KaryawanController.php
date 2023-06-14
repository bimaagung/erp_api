<?php

namespace App\Http\Controllers\API;

use App\Helpers\UploadFile;
use App\Http\Controllers\Controller;
use App\Http\Resources\KaryawanResource;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class KaryawanController extends Controller
{

    protected Karyawan $karyawan;

    public function __construct(Karyawan $karyawan)
    {
        $this->karyawan = $karyawan;
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
            'kantor_cabang_id' => ['required', 'integer',],
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
            'nik.unique' => __('karyawan.unique_nik'),
            'email.unique' => __('karyawan.unique_email'),
            'npwp.unique' => __('personal_information.unique_npwp'),
            'nomor_akun_bank.unique' => __('personal_information.unique_nomor_akun_bank'),
            'bpjs_ketenagakerjaan.unique' => __('personal_information.unique_bpjs_ketenagakerjaan'),
            'bpjs_kesehatan.unique' => __('personal_information.unique_bpjs_kesehatan'),
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors()->first())
                ->build();
        }

        if ($request->hasFile('foto')) {
            $upload = UploadFile::upload($request->file('foto'), 'karyawan');
            if (!$upload) {
                return ResponseBuilder::asError()
                    ->withMessage(__('upload.invalid'))
                    ->build();
            }
        } else {
            $upload = 'default.jpg';
        }

        $karyawan = $this->karyawan->create([
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
        ]);

        return ResponseBuilder::success(new KaryawanResource($karyawan));
    }
}
