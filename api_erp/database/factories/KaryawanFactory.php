<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Karyawan>
 */
class KaryawanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nama' => fake()->name(),
            'nik' => 12,
            'ttl' => fake()->city(),
            'jenis_kelamin' => "L",
            'email' => fake()->unique()->safeEmail(),
            'alamat' => fake()->address(),
            'domisili' => fake()->address(),
            'pendidikan' => fake()->jobTitle(),
            'agama' => "Islam",
            'tanggal_lahir' => fake()->date(),
            'telp' => '+083748',
            'foto' => 'default.jpg',
            'admin' => false,
        ];
    }
}
