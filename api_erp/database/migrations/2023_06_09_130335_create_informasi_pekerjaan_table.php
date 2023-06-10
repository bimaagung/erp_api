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
        Schema::create('informasi_pekerjaan', function (Blueprint $table) {
            $table->id();
            $table->integer('karyawan_id');
            $table->integer('kantor_cabang_id');
            $table->string('department');
            $table->string('jabatan');
            $table->date('tanggal_masuk');
            $table->string('status');
            $table->integer('periode_kontrak')->nullable();
            $table->boolean('potongan_terlambat')->nullable();
            $table->integer('toleransi_keterlambatan')->nullable();
            $table->string('mode_absensi');
            $table->boolean('absen_diluar_kantor');
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
        Schema::dropIfExists('informasi_pekerjaan');
    }
};
