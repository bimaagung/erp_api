<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'karyawan_id',
        'gaji_pokok',
        'tunjangan_tetap',
        'tunjangan_lainnya',
        'tunjangan_harian',
        'bpjs_jht_karyawan',
        'bpjs_kesehatan_karyawan',
        'bpjs_jp_karyawan',
        'asuransi_lainnya_karyawan',
        'bpjs_jht_kantor',
        'bpjs_kesehatan_kantor',
        'bpjs_jp_kantor',
        'asuransi_lainnya_kantor',
        'bpjs_jkm_kantor',
        'bpjs_jkk_kantor',
    ];
}
