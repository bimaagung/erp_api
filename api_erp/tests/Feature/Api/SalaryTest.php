<?php

namespace Tests\Feature\Api;

use App\Models\Karyawan;
use App\Models\Salary;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class SalaryTest extends TestCase
{
    use DatabaseMigrations;

    private $payload;

    protected function setUp(): void
    {
        parent::setUp();
        $this->markTestSkipped('all methods salary test still maintained');
        $this->payload = [
            'karyawan_id' => 1,
            'gaji_pokok' => fake()->randomNumber(6),
            'tunjangan_tetap' => fake()->randomNumber(5),
            'tunjangan_lainnya' => fake()->randomNumber(5),
            'tunjangan_harian' => fake()->randomNumber(5),
            'bpjs_jht_karyawan' => fake()->randomFloat(2),
            'bpjs_kesehatan_karyawan' => fake()->randomFloat(2),
            'bpjs_jp_karyawan' => fake()->randomFloat(2),
            'asuransi_lainnya_karyawan' => fake()->randomFloat(2),
            'bpjs_jht_kantor' => fake()->randomFloat(2),
            'bpjs_kesehatan_kantor' => fake()->randomFloat(2),
            'bpjs_jp_kantor' => fake()->randomFloat(2),
            'asuransi_lainnya_kantor' => fake()->randomFloat(2),
            'bpjs_jkm_kantor' => fake()->randomFloat(2),
            'bpjs_jkk_kantor' => fake()->randomFloat(2),
        ];
    }

    /** @test */
    public function can_not_created_sallary_if_karyawan_not_found()
    {
        // Action
        $response = $this->withoutExceptionHandling()->postJson("/api/gaji", $this->payload);

        // Assert
        $response->assertNotFound();
        $response->assertJson(['meta' => ['message' => __('karyawan.not_found')]]);
    }

    /** @test */
    public function can_not_created_salary_if_payload_not_valid()
    {
        // Arrange
        Karyawan::factory()->create();

        $payload = [
            'karyawan_id' => 1,
            'gaji_pokok' => 'abc',
            'tunjangan_tetap' => fake()->randomNumber(5),
            'tunjangan_lainnya' => fake()->randomNumber(5),
            'tunjangan_harian' => fake()->randomNumber(5),
            'bpjs_jht_karyawan' => fake()->randomNumber(2),
            'bpjs_kesehatan_karyawan' => fake()->randomNumber(2),
            'bpjs_jp_karyawan' => fake()->randomNumber(2),
            'asuransi_lainnya_karyawan' => null,
            'bpjs_jht_kantor' => fake()->randomNumber(2),
            'bpjs_kesehatan_kantor' => fake()->randomNumber(2),
            'bpjs_jp_kantor' => fake()->randomNumber(2),
            'asuransi_lainnya_kantor' => 'abc',
            'bpjs_jkm_kantor' => fake()->randomNumber(2),
            'bpjs_jkk_kantor' => fake()->randomNumber(2),
        ];

        // Action
        $response = $this->withoutExceptionHandling()->postJson("/api/gaji", $payload);

        // Assert
        $response->assertBadRequest();
    }

    /** @test */
    public function can_not_created_sallary_if_salary_already_exists()
    {
        // Arrange
        Karyawan::factory()->create();
        Salary::factory()->create();

        // Action
        $response = $this->withoutExceptionHandling()->postJson("/api/gaji", $this->payload);

        // Assert
        $response->assertBadRequest();
        $response->assertJson(['meta' => ['message' => __('salary.unique')]]);
    }

    /** @test */
    public function success_created_sallary()
    {

        // Arrange
        Karyawan::factory()->create();

        // Action
        $response = $this->withoutExceptionHandling()->postJson("/api/gaji", $this->payload);

        // Assert
        $response->assertOk();
        $response->assertJson(['data' => [
            'id' => 1,
            'karyawan_id' => $this->payload['karyawan_id'],
            'gaji_pokok' => $this->payload['gaji_pokok'],
            'tunjangan_tetap' => $this->payload['tunjangan_tetap'],
            'tunjangan_lainnya' => $this->payload['tunjangan_lainnya'],
            'tunjangan_harian' => $this->payload['tunjangan_harian'],
            'bpjs_jht_karyawan' => $this->payload['bpjs_jht_karyawan'],
            'bpjs_kesehatan_karyawan' => $this->payload['bpjs_kesehatan_karyawan'],
            'bpjs_jp_karyawan' => $this->payload['bpjs_jp_karyawan'],
            'asuransi_lainnya_karyawan' => $this->payload['asuransi_lainnya_karyawan'],
            'bpjs_jht_kantor' => $this->payload['bpjs_jht_kantor'],
            'bpjs_kesehatan_kantor' => $this->payload['bpjs_kesehatan_kantor'],
            'bpjs_jp_kantor' => $this->payload['bpjs_jp_kantor'],
            'asuransi_lainnya_kantor' => $this->payload['asuransi_lainnya_kantor'],
            'bpjs_jkm_kantor' => $this->payload['bpjs_jkm_kantor'],
            'bpjs_jkk_kantor' => $this->payload['bpjs_jkk_kantor'],
        ]]);
    }

    /** @test */
    public function success_created_salary_if_payload_not_complete()
    {
        // Arrange
        Karyawan::factory()->create();

        $payload = [
            'karyawan_id' => 1,
            'gaji_pokok' => fake()->randomNumber(6),
            'tunjangan_tetap' => fake()->randomNumber(5),
            'tunjangan_lainnya' => fake()->randomNumber(5),
        ];

        // Action
        $response = $this->withoutExceptionHandling()->postJson("/api/gaji", $payload);

        // Assert
        $response->assertOk();
        $response->assertJson(['data' => [
            'id' => 1,
            'karyawan_id' => $payload['karyawan_id'],
            'gaji_pokok' => $payload['gaji_pokok'],
            'tunjangan_tetap' => $payload['tunjangan_tetap'],
            'tunjangan_lainnya' => $payload['tunjangan_lainnya'],
            'tunjangan_harian' => 0,
            'bpjs_jht_karyawan' => 0,
            'bpjs_kesehatan_karyawan' => 0,
            'bpjs_jp_karyawan' => 0,
            'asuransi_lainnya_karyawan' => 0,
            'bpjs_jht_kantor' => 0,
            'bpjs_kesehatan_kantor' => 0,
            'bpjs_jp_kantor' => 0,
            'asuransi_lainnya_kantor' => 0,
            'bpjs_jkm_kantor' => 0,
            'bpjs_jkk_kantor' => 0,
        ]]);
    }
}
