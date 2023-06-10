<?php

namespace App\Http\Controllers\API;

use App\Helpers\UploadFile;
use App\Http\Controllers\Controller;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class KaryawanController extends Controller
{

    public function __construct()
    {
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'max:112'],
            'nik' => ['required', 'integer', 'unique:karyawans'],
            'ttl' => ['required'],
            'jenis_kelamin' => ['required'],
            'email' => ['required', 'email:rfc,dns', 'unique:karyawans', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'alamat' => ['required'],
            'domisili' => ['required'],
            'pendidikan' => ['required'],
            'agama' => ['required'],
            'tanggal_lahir' => ['required', 'date'],
            'telp' => ['required', 'max:15'],
            'foto' => [
                File::types(['jpg', 'png'])
                    ->max(5 * 1024)
            ]
        ]);

        $validator->setCustomMessages([
            'nik.unique' => __('karyawan.unique_nik'),
            'email.unique' => __('karyawan.unique_email'),
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors()->first())
                ->build();
        }

        if ($request->hasFile('foto')) {
            $upload = UploadFile::upload($request->file('foto'), 'karyawan');
            if (!$upload) {
                return ResponseBuilder::asError()
                    ->withMessage(__('upload.invalid'))
                    ->build();
            }
        } else {
            return 'default.jpg';
        }

        $karyawan = Karyawan::create([
            'nama' => $request->nama,
            'nik' => $request->nik,
            'ttl' => $request->ttl,
            'jenis_kelamin' => $request->jenis_kelamin,
            'email' => $request->email,
            'alamat' => $request->alamat,
            'domisili' => $request->domisili,
            'pendidikan' => $request->pendidikan,
            'agama' => $request->agama,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'foto' => $upload,
        ]);

        return ResponseBuilder::success($karyawan);
    }
}
