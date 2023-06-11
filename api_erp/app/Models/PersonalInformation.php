<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;

    protected $table = 'informasi_personal';

    protected $fillable = [
        'karyawan_id',
        'npwp',
        'tipe_pajak',
        'potongan_pajak',
        'tunjangan_pajak',
        'nama_bank',
        'nomor_akun_bank',
        'bpjs_ketenagakerjaan',
        'bpjs_kesehatan',
    ];
}
