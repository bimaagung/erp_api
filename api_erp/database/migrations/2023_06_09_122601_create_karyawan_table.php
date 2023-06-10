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
        Schema::create('karyawans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->bigInteger('nik')->unique();
            $table->string('ttl');
            $table->string('jenis_kelamin');
            $table->string('email')->unique();
            $table->text('alamat');
            $table->text('domisili');
            $table->string('pendidikan');
            $table->string('agama');
            $table->date('tanggal_lahir');
            $table->string('telp');
            $table->string('foto');
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
        Schema::dropIfExists('karyawans');
    }
};
