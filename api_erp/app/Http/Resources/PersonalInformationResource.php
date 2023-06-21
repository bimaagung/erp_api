<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PersonalInformationResource extends JsonResource
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
            'npwp' => $this->npwp,
            'tipe_pajak' => $this->tipe_pajak,
            'potongan_pajak' => (int)$this->potongan_pajak,
            'tunjangan_pajak' => (int)$this->tunjangan_pajak,
            'nama_bank' => $this->nama_bank,
            'nomor_akun_bank' => (int)$this->nomor_akun_bank,
            'bpjs_ketenagakerjaan' => $this->bpjs_ketenagakerjaan,
            'bpjs_kesehatan' => $this->bpjs_kesehatan,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
