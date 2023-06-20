<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected Position $position;

    public function __construct(Position $position)
    {
        $this->position = $position;
    }

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'exists:position, nama', 'max:112'],
        ]);

        $validator->setCustomMessages([
            'nama.exists' => __('position.unique'),
        ]);

        $position = $this->position->create([
            'nama' => $request->nama,
        ]);

        return $this->success(new PositionResource($position));
    }

    public function show(Position $position)
    {
        //
    }

    public function update(Request $request, Position $position)
    {
        //
    }

    public function destroy(Position $position)
    {
        //
    }
}
