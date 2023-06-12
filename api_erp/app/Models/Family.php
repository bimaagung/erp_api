<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $table = 'keluarga';

    protected $fillable = [
        'karyawan_id',
        'status',
        'nik',
        'nama',
        'pekerjaan',
    ];
}
