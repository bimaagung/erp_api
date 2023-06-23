<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalInformation>
 */
class PersonalInformationFactory extends Factory
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
            'npwp' => fake()->creditCardNumber(),
            'tipe_pajak' => "pribadi",
            'potongan_pajak' => fake()->randomDigitNotNull(),
            'tunjangan_pajak' => fake()->randomDigitNotNull(),
            'nama_bank' => "BCA",
            'nomor_akun_bank' => fake()->bankAccountNumber(),
            'bpjs_ketenagakerjaan' => fake()->bankAccountNumber(),
            'bpjs_kesehatan' => fake()->bankAccountNumber(),
        ];
    }
}
