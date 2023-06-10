<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\KantorCabangResource;
use App\Models\KantorCabang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function show($id)
    {
        $data = $this->kantorCabang->where('id', $id)->first();

        if (!$data) {
            return ResponseBuilder::asError()
                ->withMessage('Data not found')
                ->build();
        }
        return ResponseBuilder::success($data);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'max:60'],
            'alamat' => ['required'],
            'phone1' => ['required'],
            'phone2' => [],
            'masuk_senin_jumat' => ['required'],
            'keluar_senin_jumat' => ['required'],
            'masuk_sabtu_minggu' => ['required'],
            'keluar_sabtu_minggu' => ['required'],
        ]);
        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors()->first())
                ->build();
        }

        $data = $request->only([
            'nama',
            'alamat',
            'phone1',
            'phone2',
            'masuk_senin_jumat',
            'keluar_senin_jumat',
            'masuk_sabtu_minggu',
            'keluar_sabtu_minggu',
        ]);

        $result = $this->kantorCabang->create($data);
        return ResponseBuilder::success($result);
    }
}
