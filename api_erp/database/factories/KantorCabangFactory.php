<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KantorCabang>
 */
class KantorCabangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nama' => fake()->company(),
            'alamat' => fake()->address(),
            'phone1' => "093849",
            'phone2' => "3483972",
            'masuk_senin_jumat' => fake()->time('H:i:s', 'now'),
            'keluar_senin_jumat' => fake()->time('H:i:s', 'now'),
            'masuk_sabtu_minggu' => fake()->time('H:i:s', 'now'),
            'keluar_sabtu_minggu' => fake()->time('H:i:s', 'now'),
        ];
    }
}
