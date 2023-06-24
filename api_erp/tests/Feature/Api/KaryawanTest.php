<?php

namespace Tests\Feature\Api;

use App\Http\Resources\KaryawanResource;
use App\Models\Department;
use App\Models\JobInformation;
use App\Models\KantorCabang;
use App\Models\Karyawan;
use App\Models\PersonalInformation;
use App\Models\Position;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Nette\Utils\Arrays;
use PhpParser\Node\Expr\Cast\Array_;
use Tests\TestCase;

class KaryawanTest extends TestCase
{
    use DatabaseMigrations;


    public function create()
    {
        $karyawan = Karyawan::factory()->create();
        $personalInformation = PersonalInformation::factory()->create();
        $jobInformation = JobInformation::factory()->create();
        $branchOffice = KantorCabang::factory()->create();
        $department = Department::factory()->create();
        $position = Position::factory()->create();

        return [
            'karyawan' => $karyawan,
            'personalInformation' => $personalInformation,
            'jobInformation' => $jobInformation,
            'branchOffice' => $branchOffice,
            'department' => $department,
            'position' => $position,
        ];
    }

    /** @test */
    public function success_update_karyawan()
    {
        $karyawan = $this->create();

        $data = [
            'id' => $karyawan['karyawan']->id,
            'nama' => 'abc',
            'nik' => 2738627,
            'ttl' => $karyawan['karyawan']->ttl,
            'jenis_kelamin' => $karyawan['karyawan']->jenis_kelamin,
            'email' => $karyawan['karyawan']->email,
            'alamat' => $karyawan['karyawan']->alamat,
            'domisili' => $karyawan['karyawan']->domisili,
            'pendidikan' => $karyawan['karyawan']->pendidikan,
            'agama' => $karyawan['karyawan']->agama,
            'tanggal_lahir' => $karyawan['karyawan']->tanggal_lahir,
            'telp' => $karyawan['karyawan']->telp,
            'foto' => url('/') . Storage::url('karyawan/' . $karyawan['karyawan']->foto),
            'informasi_personal' => [
                'id' => $karyawan['personalInformation']->id,
                'karyawan_id' => $karyawan['personalInformation']->karyawan_id,
                'npwp' => $karyawan['personalInformation']->npwp,
                'tipe_pajak' => $karyawan['personalInformation']->tipe_pajak,
                'potongan_pajak' => $karyawan['personalInformation']->potongan_pajak,
                'tunjangan_pajak' => $karyawan['personalInformation']->tunjangan_pajak,
                'nama_bank' => $karyawan['personalInformation']->nama_bank,
                'nomor_akun_bank' => (int)$karyawan['personalInformation']->nomor_akun_bank,
                'bpjs_ketenagakerjaan' => $karyawan['personalInformation']->bpjs_ketenagakerjaan,
                'bpjs_kesehatan' => $karyawan['personalInformation']->bpjs_kesehatan,
                'created_at' => (string)$karyawan['personalInformation']->created_at,
                'updated_at' => (string)$karyawan['personalInformation']->updated_at,
            ],
            'informasi_pekerjaan' => [
                'id' => $karyawan['jobInformation']->id,
                'karyawan_id' => $karyawan['jobInformation']->karyawan_id,
                'kantor_cabang' => [
                    'id' => $karyawan['branchOffice']->id,
                    'nama' => $karyawan['branchOffice']->nama,
                    'alamat' => $karyawan['branchOffice']->alamat,
                    'phone1' => $karyawan['branchOffice']->phone1,
                    'phone2' => $karyawan['branchOffice']->phone2,
                    'masuk_senin_jumat' => $karyawan['branchOffice']->masuk_senin_jumat,
                    'keluar_senin_jumat' => $karyawan['branchOffice']->keluar_senin_jumat,
                    'masuk_sabtu_minggu' => $karyawan['branchOffice']->masuk_sabtu_minggu,
                    'keluar_sabtu_minggu' => $karyawan['branchOffice']->keluar_sabtu_minggu,
                    'created_at' => (string)$karyawan['branchOffice']->created_at,
                    'updated_at' => (string)$karyawan['branchOffice']->updated_at
                ],
                'department' => [
                    'id' => $karyawan['department']->id,
                    'nama' => $karyawan['department']->nama,
                    'created_at' => (string)$karyawan['department']->created_at,
                    'updated_at' => (string)$karyawan['department']->updated_at,
                ],
                'jabatan' => [
                    'id' => $karyawan['position']->id,
                    'nama' => $karyawan['position']->nama,
                    'created_at' => (string)$karyawan['position']->created_at,
                    'updated_at' => (string)$karyawan['position']->updated_at,
                ],
                'tanggal_masuk' => $karyawan['jobInformation']->tanggal_masuk,
                'status' => $karyawan['jobInformation']->status,
                'periode_kontrak' => $karyawan['jobInformation']->periode_kontrak,
                'potongan_terlambat' => $karyawan['jobInformation']->potongan_terlambat,
                'toleransi_keterlambatan' => $karyawan['jobInformation']->toleransi_keterlambatan,
                'mode_absensi' => $karyawan['jobInformation']->mode_absensi,
                'absen_diluar_kantor' => $karyawan['jobInformation']->absen_diluar_kantor,
                'created_at' => (string)$karyawan['jobInformation']->created_at,
                'updated_at' => (string)$karyawan['jobInformation']->updated_at,
            ],
            'created_at' => (string)$karyawan['karyawan']->created_at,
            'updated_at' => (string)$karyawan['karyawan']->updated_at,
        ];

        // Action
        $reponse = $this->withoutExceptionHandling()->postJson("/api/karyawan/1?_method=PUT", ['nama' => 'abc', 'nik' => 2738627]);

        // Assert
        $reponse->assertStatus(Response::HTTP_OK);
        $reponse->assertJson(['data' => $data]);
    }

    /** @test */
    public function cant_update_if_karyawan_not_found()
    {
        // Action
        $reponse = $this->withoutExceptionHandling()->postJson("/api/karyawan/1?_method=PUT", ['nama' => 'abc', 'nik' => 2738627]);

        // Assert
        $reponse->assertStatus(Response::HTTP_NOT_FOUND);
        $reponse->assertJson([
            'meta' => ['message' => __('karyawan.not_found')],
        ]);
    }

    /** @test */
    public function success_can_get_all_karyawan()
    {

        $karyawan = $this->create();

        $data = [
            'id' => $karyawan['karyawan']->id,
            'nama' => $karyawan['karyawan']->nama,
            'nik' => $karyawan['karyawan']->nik,
            'ttl' => $karyawan['karyawan']->ttl,
            'jenis_kelamin' => $karyawan['karyawan']->jenis_kelamin,
            'email' => $karyawan['karyawan']->email,
            'alamat' => $karyawan['karyawan']->alamat,
            'domisili' => $karyawan['karyawan']->domisili,
            'pendidikan' => $karyawan['karyawan']->pendidikan,
            'agama' => $karyawan['karyawan']->agama,
            'tanggal_lahir' => $karyawan['karyawan']->tanggal_lahir,
            'telp' => $karyawan['karyawan']->telp,
            'foto' => url('/') . Storage::url('karyawan/' . $karyawan['karyawan']->foto),
            'informasi_personal' => [
                'id' => $karyawan['personalInformation']->id,
                'karyawan_id' => $karyawan['personalInformation']->karyawan_id,
                'npwp' => $karyawan['personalInformation']->npwp,
                'tipe_pajak' => $karyawan['personalInformation']->tipe_pajak,
                'potongan_pajak' => $karyawan['personalInformation']->potongan_pajak,
                'tunjangan_pajak' => $karyawan['personalInformation']->tunjangan_pajak,
                'nama_bank' => $karyawan['personalInformation']->nama_bank,
                'nomor_akun_bank' => (int)$karyawan['personalInformation']->nomor_akun_bank,
                'bpjs_ketenagakerjaan' => $karyawan['personalInformation']->bpjs_ketenagakerjaan,
                'bpjs_kesehatan' => $karyawan['personalInformation']->bpjs_kesehatan,
                'created_at' => (string)$karyawan['personalInformation']->created_at,
                'updated_at' => (string)$karyawan['personalInformation']->updated_at,
            ],
            'informasi_pekerjaan' => [
                'id' => $karyawan['jobInformation']->id,
                'karyawan_id' => $karyawan['jobInformation']->karyawan_id,
                'kantor_cabang' => [
                    'id' => $karyawan['branchOffice']->id,
                    'nama' => $karyawan['branchOffice']->nama,
                    'alamat' => $karyawan['branchOffice']->alamat,
                    'phone1' => $karyawan['branchOffice']->phone1,
                    'phone2' => $karyawan['branchOffice']->phone2,
                    'masuk_senin_jumat' => $karyawan['branchOffice']->masuk_senin_jumat,
                    'keluar_senin_jumat' => $karyawan['branchOffice']->keluar_senin_jumat,
                    'masuk_sabtu_minggu' => $karyawan['branchOffice']->masuk_sabtu_minggu,
                    'keluar_sabtu_minggu' => $karyawan['branchOffice']->keluar_sabtu_minggu,
                    'created_at' => (string)$karyawan['branchOffice']->created_at,
                    'updated_at' => (string)$karyawan['branchOffice']->updated_at
                ],
                'department' => [
                    'id' => $karyawan['department']->id,
                    'nama' => $karyawan['department']->nama,
                    'created_at' => (string)$karyawan['department']->created_at,
                    'updated_at' => (string)$karyawan['department']->updated_at,
                ],
                'jabatan' => [
                    'id' => $karyawan['position']->id,
                    'nama' => $karyawan['position']->nama,
                    'created_at' => (string)$karyawan['position']->created_at,
                    'updated_at' => (string)$karyawan['position']->updated_at,
                ],
                'tanggal_masuk' => $karyawan['jobInformation']->tanggal_masuk,
                'status' => $karyawan['jobInformation']->status,
                'periode_kontrak' => $karyawan['jobInformation']->periode_kontrak,
                'potongan_terlambat' => $karyawan['jobInformation']->potongan_terlambat,
                'toleransi_keterlambatan' => $karyawan['jobInformation']->toleransi_keterlambatan,
                'mode_absensi' => $karyawan['jobInformation']->mode_absensi,
                'absen_diluar_kantor' => $karyawan['jobInformation']->absen_diluar_kantor,
                'created_at' => (string)$karyawan['jobInformation']->created_at,
                'updated_at' => (string)$karyawan['jobInformation']->updated_at,
            ],
            'created_at' => (string)$karyawan['karyawan']->created_at,
            'updated_at' => (string)$karyawan['karyawan']->updated_at,
        ];

        $this
            ->getJson("/api/karyawan")
            ->assertOk()
            ->assertJson(['data' => [$data]]);
    }

    /** @test */
    public function success_can_get_by_id_karyawan()
    {

        $karyawan = $this->create();

        $data = [
            'id' => $karyawan['karyawan']->id,
            'nama' => $karyawan['karyawan']->nama,
            'nik' => $karyawan['karyawan']->nik,
            'ttl' => $karyawan['karyawan']->ttl,
            'jenis_kelamin' => $karyawan['karyawan']->jenis_kelamin,
            'email' => $karyawan['karyawan']->email,
            'alamat' => $karyawan['karyawan']->alamat,
            'domisili' => $karyawan['karyawan']->domisili,
            'pendidikan' => $karyawan['karyawan']->pendidikan,
            'agama' => $karyawan['karyawan']->agama,
            'tanggal_lahir' => $karyawan['karyawan']->tanggal_lahir,
            'telp' => $karyawan['karyawan']->telp,
            'foto' => url('/') . Storage::url('karyawan/' . $karyawan['karyawan']->foto),
            'informasi_personal' => [
                'id' => $karyawan['personalInformation']->id,
                'karyawan_id' => $karyawan['personalInformation']->karyawan_id,
                'npwp' => $karyawan['personalInformation']->npwp,
                'tipe_pajak' => $karyawan['personalInformation']->tipe_pajak,
                'potongan_pajak' => $karyawan['personalInformation']->potongan_pajak,
                'tunjangan_pajak' => $karyawan['personalInformation']->tunjangan_pajak,
                'nama_bank' => $karyawan['personalInformation']->nama_bank,
                'nomor_akun_bank' => (int)$karyawan['personalInformation']->nomor_akun_bank,
                'bpjs_ketenagakerjaan' => $karyawan['personalInformation']->bpjs_ketenagakerjaan,
                'bpjs_kesehatan' => $karyawan['personalInformation']->bpjs_kesehatan,
                'created_at' => (string)$karyawan['personalInformation']->created_at,
                'updated_at' => (string)$karyawan['personalInformation']->updated_at,
            ],
            'informasi_pekerjaan' => [
                'id' => $karyawan['jobInformation']->id,
                'karyawan_id' => $karyawan['jobInformation']->karyawan_id,
                'kantor_cabang' => [
                    'id' => $karyawan['branchOffice']->id,
                    'nama' => $karyawan['branchOffice']->nama,
                    'alamat' => $karyawan['branchOffice']->alamat,
                    'phone1' => $karyawan['branchOffice']->phone1,
                    'phone2' => $karyawan['branchOffice']->phone2,
                    'masuk_senin_jumat' => $karyawan['branchOffice']->masuk_senin_jumat,
                    'keluar_senin_jumat' => $karyawan['branchOffice']->keluar_senin_jumat,
                    'masuk_sabtu_minggu' => $karyawan['branchOffice']->masuk_sabtu_minggu,
                    'keluar_sabtu_minggu' => $karyawan['branchOffice']->keluar_sabtu_minggu,
                    'created_at' => (string)$karyawan['branchOffice']->created_at,
                    'updated_at' => (string)$karyawan['branchOffice']->updated_at
                ],
                'department' => [
                    'id' => $karyawan['department']->id,
                    'nama' => $karyawan['department']->nama,
                    'created_at' => (string)$karyawan['department']->created_at,
                    'updated_at' => (string)$karyawan['department']->updated_at,
                ],
                'jabatan' => [
                    'id' => $karyawan['position']->id,
                    'nama' => $karyawan['position']->nama,
                    'created_at' => (string)$karyawan['position']->created_at,
                    'updated_at' => (string)$karyawan['position']->updated_at,
                ],
                'tanggal_masuk' => $karyawan['jobInformation']->tanggal_masuk,
                'status' => $karyawan['jobInformation']->status,
                'periode_kontrak' => $karyawan['jobInformation']->periode_kontrak,
                'potongan_terlambat' => $karyawan['jobInformation']->potongan_terlambat,
                'toleransi_keterlambatan' => $karyawan['jobInformation']->toleransi_keterlambatan,
                'mode_absensi' => $karyawan['jobInformation']->mode_absensi,
                'absen_diluar_kantor' => $karyawan['jobInformation']->absen_diluar_kantor,
                'created_at' => (string)$karyawan['jobInformation']->created_at,
                'updated_at' => (string)$karyawan['jobInformation']->updated_at,
            ],
            'created_at' => (string)$karyawan['karyawan']->created_at,
            'updated_at' => (string)$karyawan['karyawan']->updated_at,
        ];

        $this
            ->getJson("/api/karyawan/1")
            ->assertOk()
            ->assertJson(['data' => $data]);
    }

    /** @test */
    public function cant_get_by_id_if_id_karyawan_not_found()
    {
        $this
            ->getJson("/api/karyawan/1")
            ->assertNotFound()
            ->assertJson(['meta' => ['message' => __('karyawan.not_found')]]);
    }

    /** @test */
    public function success_delete_karyawan()
    {
        // Arrange
        $this->create();

        // Action
        $response = $this->deleteJson("/api/karyawan/1");

        // Assert
        $response->assertOk();
    }

    public function cant_delete_if_id_karyawan_not_found()
    {
        // Action
        $response = $this->deleteJson("/api/karyawan/1");

        // Assert
        $response->assertNotFound();
        $response->assertJson(['meta' => ['message' => __('karyawan.not_found')]]);
    }
}
