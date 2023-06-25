<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->integer('karyawan_id')->unique();
            $table->integer('gaji_pokok');
            $table->integer('tunjangan_tetap')->default(0);
            $table->integer('tunjangan_lainnya')->default(0);
            $table->integer('tunjangan_harian')->default(0);
            $table->float('bpjs_jht_karyawan')->default(0.00000);
            $table->float('bpjs_kesehatan_karyawan')->default(0.00000);
            $table->float('bpjs_jp_karyawan')->default(0.00000);
            $table->float('asuransi_lainnya_karyawan')->default(0.00000);
            $table->float('bpjs_jht_kantor')->default(0.00000);
            $table->float('bpjs_kesehatan_kantor')->default(0.00000);
            $table->float('bpjs_jp_kantor')->default(0.00000);
            $table->float('asuransi_lainnya_kantor')->default(0.00000);
            $table->float('bpjs_jkm_kantor')->default(0.00000);
            $table->float('bpjs_jkk_kantor')->default(0.00000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salaries');
    }
};
