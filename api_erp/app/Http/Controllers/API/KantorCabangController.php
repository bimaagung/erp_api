<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\KantorCabangResource;
use App\Http\Resources\PaginationResource;
use App\Http\Resources\Paginations\PaginationKantorCabangResource;
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

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $validator = Validator::make(['per_page' => $perPage], [
            'per_page' => 'numeric',
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $branchOffice = $this->kantorCabang->orderBy('created_at', 'DESC')->paginate($perPage);

        return $this->successWithPaginate(
            new PaginationResource($branchOffice),
            KantorCabangResource::collection($branchOffice),
        );
    }

    public function show($id)
    {
        $data = $this->kantorCabang->where('id', $id)->first();

        if (!$data) {
            return $this->fail(__('branchOffice.not_found'));
        }

        return $this->success($data);
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
            return $this->fail($validator->errors()->first());
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
        return $this->success(new KantorCabangResource($result));
    }
}
