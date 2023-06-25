<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SalaryResource;
use App\Models\Karyawan;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalaryController extends Controller
{

    protected Salary $salary;
    protected Karyawan $karyawan;

    public function __construct(Salary $salary, Karyawan $karyawan)
    {
        $this->salary = $salary;
        $this->karyawan = $karyawan;
    }

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'karyawan_id' => ['required', 'unique:salaries'],
            'gaji_pokok' => ['required', 'integer'],
            'tunjangan_tetap' => ['integer'],
            'tunjangan_lainnya' => ['integer'],
            'tunjangan_harian' => ['integer'],
            'bpjs_jht_karyawan' => ['decimal:5'],
            'bpjs_kesehatan_karyawan' => ['decimal:5'],
            'bpjs_jp_karyawan' => ['decimal:5'],
            'asuransi_lainnya_karyawan' => ['decimal:5'],
            'bpjs_jht_kantor' => ['decimal:5'],
            'bpjs_kesehatan_kantor' => ['decimal:5'],
            'bpjs_jp_kantor' => ['decimal:5'],
            'asuransi_lainnya_kantor' => ['decimal:5'],
            'bpjs_jkm_kantor' => ['decimal:5'],
            'bpjs_jkk_kantor' => ['decimal:5'],
        ]);

        $validator->setCustomMessages([
            'karyawan_id.unique' => __('salary.unique'),
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $karyawanId = $this->karyawan->find($request->karyawan_id);

        if (!$karyawanId) {
            return $this->notFound(__('karyawan.not_found'));
        }

        $data = $this->salary->create($request->all());

        return $this->success(new SalaryResource($data));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Salary  $salary
     * @return \Illuminate\Http\Response
     */
    public function show(Salary $salary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Salary  $salary
     * @return \Illuminate\Http\Response
     */
    public function edit(Salary $salary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Salary  $salary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Salary $salary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Salary  $salary
     * @return \Illuminate\Http\Response
     */
    public function destroy(Salary $salary)
    {
        //
    }
}
