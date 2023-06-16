<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function informasiPersonal()
    {
        return $this->hasOne(PersonalInformation::class, 'karyawan_id', 'id');
    }

    public function informasiPekerjaan()
    {
        return $this->hasOne(JobInformation::class, 'karyawan_id', 'id');
    }
}
