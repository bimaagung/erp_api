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
        Schema::create('informasi_personal', function (Blueprint $table) {
            $table->id();
            $table->integer('karyawan_id');
            $table->string('npwp')->unique();
            $table->string('tipe_pajak')->nullable();
            $table->bigInteger('potongan_pajak')->nullable();
            $table->bigInteger('tunjangan_pajak')->nullable();
            $table->string('nama_bank');
            $table->bigInteger('nomor_akun_bank')->unique();
            $table->bigInteger('bpjs_ketenagakerjaan')->unique();
            $table->bigInteger('bpjs_kesehatan')->unique();
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
        Schema::dropIfExists('informasi_personal');
    }
};
