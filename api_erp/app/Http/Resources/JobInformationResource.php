<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobInformationResource extends JsonResource
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
            'kantor_cabang' => new KantorCabangResource($this->branchOffice),
            'department' => $this->department,
            'jabatan' => $this->jabatan,
            'tanggal_masuk' => $this->tanggal_masuk,
            'status' => $this->status,
            'periode_kontrak' => (int)$this->periode_kontrak,
            'potongan_terlambat' => $this->potongan_terlambat,
            'toleransi_keterlambatan' => (int)$this->toleransi_keterlambatan,
            'mode_absensi' => $this->mode_absensi,
            'absen_diluar_kantor' => $this->absen_diluar_kantor,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
