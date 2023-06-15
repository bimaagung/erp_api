<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nik',
        'ttl',
        'jenis_kelamin',
        'email',
        'alamat',
        'domisili',
        'pendidikan',
        'agama',
        'tanggal_lahir',
        'telp',
        'foto',
        'admin'
    ];
}
