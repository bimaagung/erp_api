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
        Schema::table('informasi_pekerjaan', function (Blueprint $table) {
            $table->dropColumn('department');
            $table->dropColumn('jabatan');
            $table->integer('jabatan_id')->after('kantor_cabang_id')->defaultValue(1);
            $table->integer('department_id')->after('kantor_cabang_id')->defaultValue(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('informasi_pekerjaan', function (Blueprint $table) {
            $table->string('department');
            $table->string('jabatan');
            $table->dropColumn('jabatan_id');
            $table->dropColumn('department_id');
        });
    }
};
