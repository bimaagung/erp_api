<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobInformation>
 */
class JobInformationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'karyawan_id' => 1,
            'kantor_cabang_id' => 1,
            'department_id' => 1,
            'jabatan_id' => 1,
            'tanggal_masuk' => fake()->date(),
            'status' => "kontrak",
            'periode_kontrak' => fake()->randomDigitNotNull(),
            'potongan_terlambat' => fake()->boolean(),
            'toleransi_keterlambatan' => fake()->randomDigitNotNull(),
            'mode_absensi' => "Jarak Jauh",
            'absen_diluar_kantor' => fake()->boolean(),
        ];
    }
}
