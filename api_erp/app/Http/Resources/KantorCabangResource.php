<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KantorCabangResource extends JsonResource
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
            'alamat' => $this->alamat,
            'phone1' => $this->phone1,
            'phone2' => $this->phone2,
            'masuk_senin_jumat' => $this->masuk_senin_jumat,
            'keluar_senin_jumat' => $this->keluar_senin_jumat,
            'masuk_sabtu_minggu' => $this->masuk_sabtu_minggu,
            'keluar_sabtu_minggu' => $this->keluar_sabtu_minggu,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
