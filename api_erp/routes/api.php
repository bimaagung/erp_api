<?php

use App\Http\Controllers\API\AuthContoller;
use App\Http\Controllers\API\KantorCabangController;
use App\Http\Controllers\API\KaryawanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthContoller::class)->group(function () {
    Route::post('/signup', 'register');
    Route::post('/signin', 'login')->name('login');;
});

Route::middleware('auth:api')->group(function () {
    Route::controller(KaryawanController::class)->group(function () {
        Route::post('/karyawan', 'create');
    });
});


Route::group(['prefix' => 'kantor-cabang'], function () {
    Route::get('/', [KantorCabangController::class, 'index']);
    Route::get('/{id}', [KantorCabangController::class, 'show']);
    Route::post('/', [KantorCabangController::class, 'create']);
});