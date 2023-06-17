<?php

namespace App\Http\Resources\Paginations;

use Illuminate\Http\Resources\Json\JsonResource;

class PaginationResource extends JsonResource
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
            'total'       => $this->total(),
            'count'       => $this->count(),
            'perPage'     => $this->perPage(),
            'currentPage' => $this->currentPage(),
            'totalPages'  => $this->lastPage()
        ];
    }
}
