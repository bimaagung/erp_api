<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
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
            'gaji_pokok' => fake()->randomNumber(6),
            'tunjangan_tetap' => fake()->randomNumber(5),
            'tunjangan_lainnya' => fake()->randomNumber(5),
            'tunjangan_harian' => fake()->randomNumber(5),
            'bpjs_jht_karyawan' => fake()->randomNumber(2),
            'bpjs_kesehatan_karyawan' => fake()->randomNumber(2),
            'bpjs_jp_karyawan' => fake()->randomNumber(2),
            'asuransi_lainnya_karyawan' => fake()->randomNumber(2),
            'bpjs_jht_kantor' => fake()->randomNumber(2),
            'bpjs_kesehatan_kantor' => fake()->randomNumber(2),
            'bpjs_jp_kantor' => fake()->randomNumber(2),
            'asuransi_lainnya_kantor' => fake()->randomNumber(2),
            'bpjs_jkm_kantor' => fake()->randomNumber(2),
            'bpjs_jkk_kantor' => fake()->randomNumber(2),
        ];
    }
}
