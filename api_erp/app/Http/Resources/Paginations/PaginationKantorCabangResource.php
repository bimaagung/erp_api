<?php

namespace App\Http\Resources\Paginations;

use App\Http\Resources\KantorCabangResource;
use Illuminate\Http\Resources\Json\ResourceCollection;


class PaginationKantorCabangResource extends ResourceCollection
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
            'data'          => KantorCabangResource::collection($this->collection),
            'pagination' => [
                'total'       => $this->total(),
                'count'       => $this->count(),
                'perPage'     => $this->perPage(),
                'currentPage' => $this->currentPage(),
                'totalPages'  => $this->lastPage()
            ],
        ];
    }
    public function withResponse($request, $response)
    {
        $responseData = json_decode($response->getContent(), true);

        if ($responseData !== null) {
            $modifiedData = [
                'meta' => [
                    'success' => true,
                    'code' => $response->getStatusCode(),
                    'message' => 'OK',
                ],
                'data' => $responseData['data'],
                'pagination' => $responseData['pagination']
            ];

            $response->setContent(json_encode($modifiedData));
        }
    }
}
