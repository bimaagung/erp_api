<?php

namespace Tests\Feature\Api;

use App\Models\Department;
use App\Models\JobInformation;
use App\Models\KantorCabang;
use App\Models\Karyawan;
use App\Models\PersonalInformation;
use App\Models\Position;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class KaryawanTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_all_karyawan()
    {
        $karyawan = Karyawan::factory()->create();
        $personalInformation = PersonalInformation::factory()->create();
        $jobInformation = JobInformation::factory()->create();
        $branchOffice = KantorCabang::factory()->create();
        $department = Department::factory()->create();
        $position = Position::factory()->create();


        $data = [
            'id' => $karyawan->id,
            'nama' => $karyawan->nama,
            'nik' => $karyawan->nik,
            'ttl' => $karyawan->ttl,
            'jenis_kelamin' => $karyawan->jenis_kelamin,
            'email' => $karyawan->email,
            'alamat' => $karyawan->alamat,
            'domisili' => $karyawan->domisili,
            'pendidikan' => $karyawan->pendidikan,
            'agama' => $karyawan->agama,
            'tanggal_lahir' => $karyawan->tanggal_lahir,
            'telp' => $karyawan->telp,
            'foto' => url('/') . Storage::url('karyawan/' . $karyawan->foto),
            'informasi_personal' => [
                'id' => $personalInformation->id,
                'karyawan_id' => $personalInformation->karyawan_id,
                'npwp' => $personalInformation->npwp,
                'tipe_pajak' => $personalInformation->tipe_pajak,
                'potongan_pajak' => $personalInformation->potongan_pajak,
                'tunjangan_pajak' => $personalInformation->tunjangan_pajak,
                'nama_bank' => $personalInformation->nama_bank,
                'nomor_akun_bank' => (int)$personalInformation->nomor_akun_bank,
                'bpjs_ketenagakerjaan' => $personalInformation->bpjs_ketenagakerjaan,
                'bpjs_kesehatan' => $personalInformation->bpjs_kesehatan,
                'created_at' => (string)$personalInformation->created_at,
                'updated_at' => (string)$personalInformation->updated_at,
            ],
            'informasi_pekerjaan' => [
                'id' => $jobInformation->id,
                'karyawan_id' => $jobInformation->karyawan_id,
                'kantor_cabang' => [
                    'id' => $branchOffice->id,
                    'nama' => $branchOffice->nama,
                    'alamat' => $branchOffice->alamat,
                    'phone1' => $branchOffice->phone1,
                    'phone2' => $branchOffice->phone2,
                    'masuk_senin_jumat' => $branchOffice->masuk_senin_jumat,
                    'keluar_senin_jumat' => $branchOffice->keluar_senin_jumat,
                    'masuk_sabtu_minggu' => $branchOffice->masuk_sabtu_minggu,
                    'keluar_sabtu_minggu' => $branchOffice->keluar_sabtu_minggu,
                    'created_at' => (string)$branchOffice->created_at,
                    'updated_at' => (string)$branchOffice->updated_at
                ],
                'department' => [
                    'id' => $department->id,
                    'nama' => $department->nama,
                    'created_at' => (string)$department->created_at,
                    'updated_at' => (string)$department->updated_at,
                ],
                'jabatan' => [
                    'id' => $position->id,
                    'nama' => $position->nama,
                    'created_at' => (string)$position->created_at,
                    'updated_at' => (string)$position->updated_at,
                ],
                'tanggal_masuk' => $jobInformation->tanggal_masuk,
                'status' => $jobInformation->status,
                'periode_kontrak' => $jobInformation->periode_kontrak,
                'potongan_terlambat' => $jobInformation->potongan_terlambat,
                'toleransi_keterlambatan' => $jobInformation->toleransi_keterlambatan,
                'mode_absensi' => $jobInformation->mode_absensi,
                'absen_diluar_kantor' => $jobInformation->absen_diluar_kantor,
                'created_at' => (string)$jobInformation->created_at,
                'updated_at' => (string)$jobInformation->updated_at,
            ],
            'created_at' => (string)$karyawan->created_at,
            'updated_at' => (string)$karyawan->updated_at,
        ];

        $this
            ->getJson("/api/karyawan")
            ->assertOk()
            ->assertJson(['data' => [$data]]);
    }
}
