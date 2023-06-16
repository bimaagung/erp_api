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
            'id' => $request->id,
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
            'foto' => $this->foto,
            'informasi_personal' => [
                'id' => $this->id,
                'npwp' => $this->npwp,
                'tipe_pajak' => $this->tipe_pajak,
                'potongan_pajak' => (int)$this->potongan_pajak,
                'tunjangan_pajak' => (int)$this->tunjangan_pajak,
                'nama_bank' => $this->nama_bank,
                'nomor_akun_bank' => (int)$this->nomor_akun_bank,
                'bpjs_ketenagakerjaan' => (int)$this->bpjs_ketenagakerjaan,
                'bpjs_kesehatan' => (int)$this->bpjs_kesehatan,
                'created_at' => (string) $this->created_at,
                'updated_at' => (string) $this->updated_at,
            ],
            'informasi_pekerjaan' => [
                'id' => $this->id,
                'kantor_cabang_id' => (int)$this->kantor_cabang_id,
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
            ],
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
