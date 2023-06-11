<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'nama' => $this->nama,
            'nik' => $this->nik,
            'ttl' => $this->ttl,
            'jenis_kelamin' => $this->jenis_kelamin,
            'email' => $this->email,
            'alamat' => $this->alamat,
            'domisili' => $this->domisili,
            'pendidikan' => $this->pendidikan,
            'agama' => $this->agama,
            'tanggal_lahir' => $this->tanggal_lahir,
            'telp' => $this->telp,
            'foto' => $this->foto,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
