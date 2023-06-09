<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class KaryawanController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "nama" => "required|string",
            "nik" => "required|integer",
            "nik" => "required|integer",

        ]);

        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors())
                ->build();
        }

        Karyawan::create($validator);
    }
}
