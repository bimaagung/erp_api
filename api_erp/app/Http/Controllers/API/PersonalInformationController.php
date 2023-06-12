<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonalInformationResource;
use App\Models\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class PersonalInformationController extends Controller
{

    protected PersonalInformation $personalInformation;

    public function __construct(PersonalInformation $personalInformation)
    {
        $this->personalInformation = $personalInformation;
    }

    public function save(Request $request)
    {
        $request->merge(['karyawan_id' => $request->route('karyawan_id')]);
        $validator = Validator::make($request->all(), [
            'karyawan_id' => ['required', 'integer'],
            'npwp' => ['required', 'integer', 'unique:informasi_personal'],
            'tipe_pajak',
            'potongan_pajak' => ['integer'],
            'tunjangan_pajak' => ['integer'],
            'nama_bank' => ['required'],
            'nomor_akun_bank' => ['integer', 'unique:informasi_personal'],
            'bpjs_ketenagakerjaan' => ['integer', 'unique:informasi_personal'],
            'bpjs_kesehatan' => ['integer', 'unique:informasi_personal'],
        ]);

        $validator->setCustomMessages([
            'karyawan_id.exists' => __('karyawan.not_found'),
            'npwp.unique' => __('personal_information.unique_npwp'),
            'nomor_akun_bank.unique' => __('personal_information.unique_nomor_akun_bank'),
            'bpjs_ketenagakerjaan.unique' => __('personal_information.unique_bpjs_ketenagakerjaan'),
            'bpjs_kesehatan.unique' => __('personal_information.unique_bpjs_kesehatan'),
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

        $checkExist = $this->personalInformation->where('karyawan_id', $request->karyawan_id)->get();

        if (!$checkExist->count() > 0) {
            $user = $this->store($request->all());
        } else {
            $user = $this->update($request->all(), $checkExist[0]['id']);
        }

        return ResponseBuilder::success(new PersonalInformationResource($user));
    }


    public function store($karyawan)
    {
        return $this->personalInformation->create($karyawan);
    }

    public function update($karyawan, $id)
    {

        $this->personalInformation->where('id', $id)->update($karyawan);
        return $this->personalInformation->find($id);
    }
}
