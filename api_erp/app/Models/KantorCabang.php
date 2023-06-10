<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KantorCabang extends Model
{
    use HasFactory;

    protected $table = 'kantor_cabang';

    protected $fillable = [
        'nama',
        'alamat',
        'phone',
        'phone2',
        'masuk_senin_jumat',
        'keluar_senin_jumat',
        'masuk_sabtu_minggu',
        'keluar_sabtu_minggu',
        
    ];
}
