<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\FamilyResource;
use App\Models\Family;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class FamilyController extends Controller
{

    protected Family $family;

    public function __construct(Family $family)
    {
        $this->family = $family;
    }

    public function store(Request $request)
    {
        $request->merge(['karyawan_id' => $request->route('karyawan_id')]);
        $validator = Validator::make($request->all(), [
            'karyawan_id' => ['required', 'integer', 'exists:karyawans,id'],
            'status' => ['required'],
            'nik' => ['required', 'integer', 'unique:keluarga'],
            'nama' => ['required', 'max:112'],
            'pekerjaan',
        ]);

        $validator->setCustomMessages([
            'karyawan_id.exists' => __('karyawan.not_found'),
            'nik.unique' => __('family.unique_nik'),
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('karyawan_id')) {
                return ResponseBuilder::asError()
                    ->withHttpCode(404)
                    ->withMessage($errors->first('karyawan_id'))
                    ->build();
            } else {
                return ResponseBuilder::asError()
                    ->withMessage($validator->errors()->first())
                    ->build();
            }
        }

        $result = $this->family->create($request->all());

        return ResponseBuilder::success(new FamilyResource($result));
    }

    public function destroy($id)
    {
    
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'numeric', 'exists:keluarga,id']
        ]);

        $validator->setCustomMessages([
            'id.exists' => __('keluarga.not_found')
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();

            if($errors->has('id')) {
                return $this->fail($errors->first(('id')));
            } else {
                return $this->fail($validator->errors()->first());
            }
        }

        try {
            $dbResult = DB::transaction(function () use ($id) {
                $dbResult = $this->family->destroy($id);
                return [
                    'keluarga' => $dbResult
                ];
            }, 5);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e);
            throw $e;
        }
        Cache::flush();
        return $this->success($dbResult['keluarga']);
    }

}
