<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\KantorCabangResource;
use App\Http\Resources\PaginationResource;
use App\Models\KantorCabang;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class KantorCabangController extends Controller
{

    protected $kantorCabang;
    protected int $expiration = 60 * 60 * 24 * 7;
    protected string $cacheKey = 'kantorCabang';

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

    public function update(Request $request, int $id)
    {
        $kantorCabang = $this->kantorCabang->find($id);

        if (!$kantorCabang) {
            return $this->notFound(__('kantor_cabang.not_found'));
        }

        $kantorCabangPayload = $request->only(
            [
                'nama',
                'alamat',
                'phone1',
                'phone2',
                'masuk_senin_jumat',
                'keluar_senin_jumat',
                'masuk_sabtu_minggu',
                'keluar_sabtu_minggu',
            ]
            );

            try {
              DB::transaction(function () use ($id, $kantorCabangPayload) {
                    $this->kantorCabang->where('id', $id)->update($kantorCabangPayload);
                    
                }, 5);
            } catch (QueryException $e) {
                DB::rollBack();
                Log::error($e);
                throw $e;
            }
            Cache::flush();

            return $this->success(new KantorCabangResource($kantorCabang));
    }

    public function destroy($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'numeric', 'exists:kantor_cabang,id']
        ]);

        $validator->setCustomMessages([
            'id.exists' => __('kantor_cabang.not_found'),
        ]);

        if($validator->fails()) {
            $errors = $validator->errors();

            if($errors->has('id')) {
                return $this->fail($errors->first('id'));
            } else {
                return $this->fail($validator->errors()->first());
            }
        }
        try {
            $dbResult = DB::transaction(function () use ($id) {
                $dbResult = $this->kantorCabang->destroy($id);
                return [
                    'kantor_cabang' => $dbResult
                ];
            }, 5);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e);
            throw $e;
        }
        Cache::flush();
        return $this->success($dbResult['kantor_cabang']);
    }
}
