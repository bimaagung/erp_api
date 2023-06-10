<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\KantorCabangResource;
use App\Models\KantorCabang;
use Illuminate\Http\Request;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class KantorCabangController extends Controller
{

    protected $kantorCabang;

    public function __construct(KantorCabang $kantorCabang)
    {
        $this->kantorCabang = $kantorCabang;
    }

    public function index()
    {
        $data = $this->kantorCabang->get();
        $result = KantorCabangResource::collection($data);

        return ResponseBuilder::success($result);
    }
}
