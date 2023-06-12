<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobInformationResource;
use App\Models\JobInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class JobInformationController extends Controller
{
    protected JobInformation $jobInformation;
    protected KantorCabangController $branchOffice;

    public function __construct(JobInformation $jobInformation, KantorCabangController $branchOffice)
    {
        $this->jobInformation = $jobInformation;
        $this->branchOffice = $branchOffice;
    }

    public function save(Request $request)
    {
        $request->merge(['karyawan_id' => $request->route('karyawan_id')]);
        $validator = Validator::make($request->all(), [
            'karyawan_id' => ['required', 'integer'],
            'kantor_cabang_id' => ['required', 'integer',],
            'department' => ['required'],
            'jabatan' => ['required'],
            'tanggal_masuk' => ['required', 'date'],
            'status' => ['required'],
            'periode_kontrak' => ['integer'],
            'potongan_terlambat' => ['boolean'],
            'toleransi_keterlambatan' => ['integer'],
            'mode_absensi' => ['required'],
            'absen_diluar_kantor' => ['boolean'],
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors()->first())
                ->build();
        }

        $this->branchOffice->show($request->kantor_cabang);

        $checkExist = $this->jobInformation->where('karyawan_id', $request->karyawan_id)->get();

        if (!$checkExist->count() > 0) {
            $job = $this->store($request->all());
        } else {
            $job = $this->update($request->all(), $checkExist->id);
        }

        return ResponseBuilder::success(new JobInformationResource($job));
    }


    public function store($karyawan)
    {
        return $this->jobInformation->create($karyawan);
    }

    public function update($karyawan, $id)
    {
        return $this->jobInformation->where('id', $id)->update($karyawan);
    }
}
