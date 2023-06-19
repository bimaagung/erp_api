<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobInformation extends Model
{
    use HasFactory;

    protected $table = 'informasi_pekerjaan';

    protected $fillable = [
        'karyawan_id',
        'kantor_cabang_id',
        'department',
        'jabatan',
        'tanggal_masuk',
        'status',
        'periode_kontrak',
        'potongan_terlambat',
        'toleransi_keterlambatan',
        'mode_absensi',
        'absen_diluar_kantor',
    ];

    public function branchOffice()
    {
        return $this->hasOne(KantorCabang::class, 'id', 'kantor_cabang_id');
    }
}
