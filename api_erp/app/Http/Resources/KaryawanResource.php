<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class KaryawanResource extends JsonResource
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
            'nama' => $this->nama,
            'nik' => (int)$this->nik,
            'ttl' => $this->ttl,
            'jenis_kelamin' => $this->jenis_kelamin,
            'email' => $this->email,
            'alamat' => $this->alamat,
            'domisili' => $this->domisili,
            'pendidikan' => $this->pendidikan,
            'agama' => $this->agama,
            'tanggal_lahir' => $this->tanggal_lahir,
            'telp' => $this->telp,
            'foto' => url('/') . Storage::url('karyawan/' . $this->foto),
            'status_karyawan' => $this->status_karyawan,
            'informasi_personal' => new PersonalInformationResource($this->informasiPersonal),
            'informasi_pekerjaan' => new JobInformationResource($this->informasiPekerjaan),
            'informasi_keluarga' => FamilyResource::collection($this->informasiKeluarga),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
