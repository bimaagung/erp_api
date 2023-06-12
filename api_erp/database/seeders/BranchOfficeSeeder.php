<?php

namespace Database\Seeders;

use App\Models\KantorCabang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BranchOfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        KantorCabang::create([
            'nama' => Str::random(10),
            'alamat' => Str::random(10),
            'phone1' => Str::random(10),
            'phone2' => Str::random(10),
            'masuk_senin_jumat' => Str::random(10),
            'keluar_senin_jumat' => Str::random(10),
            'masuk_sabtu_minggu' => Str::random(10),
            'keluar_sabtu_minggu' => Str::random(10),
            'alamat' => Str::random(10),
        ]);
    }
}
