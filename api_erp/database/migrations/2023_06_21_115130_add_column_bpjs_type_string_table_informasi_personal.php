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
        Schema::table('informasi_personal', function (Blueprint $table) {
            $table->string('bpjs_kesehatan')->after('nomor_akun_bank')->unique();
            $table->string('bpjs_ketenagakerjaan')->after('nomor_akun_bank')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('informasi_personal', function (Blueprint $table) {
            $table->dropColumn('bpjs_ketenagakerjaan');
            $table->dropColumn('bpjs_kesehatan');
        });
    }
};
