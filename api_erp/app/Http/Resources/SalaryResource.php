<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'karyawan_id' => (int)$this->karyawan_id,
            'gaji_pokok' => (int)$this->gaji_pokok,
            'tunjangan_tetap' => (int)$this->tunjangan_tetap,
            'tunjangan_lainnya' => (int)$this->tunjangan_lainnya,
            'tunjangan_harian' => (int)$this->tunjangan_harian,
            'bpjs_jht_karyawan' => $this->bpjs_jht_karyawan,
            'bpjs_kesehatan_karyawan' => $this->bpjs_kesehatan_karyawan,
            'bpjs_jp_karyawan' => $this->bpjs_jp_karyawan,
            'asuransi_lainnya_karyawan' => $this->asuransi_lainnya_karyawan,
            'bpjs_jht_kantor' => $this->bpjs_jht_kantor,
            'bpjs_kesehatan_kantor' => $this->bpjs_kesehatan_kantor,
            'bpjs_jp_kantor' => $this->bpjs_jp_kantor,
            'asuransi_lainnya_kantor' => $this->asuransi_lainnya_kantor,
            'bpjs_jkm_kantor' => $this->bpjs_jkm_kantor,
            'bpjs_jkk_kantor' => $this->bpjs_jkk_kantor,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
