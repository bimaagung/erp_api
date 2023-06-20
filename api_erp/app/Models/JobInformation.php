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
        'department_id',
        'jabatan_id',
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

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'jabatan_id', 'id');
    }
}
