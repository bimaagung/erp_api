<?php

use App\Http\Controllers\API\AuthContoller;
use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\FamilyController;
use App\Http\Controllers\API\JobInformationController;
use App\Http\Controllers\API\KantorCabangController;
use App\Http\Controllers\API\KaryawanController;
use App\Http\Controllers\API\PersonalInformationController;
use App\Http\Resources\DepartmentResource;
use Illuminate\Http\Request;
use Illuminate\Routing\RouteGroup;
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

// Route::middleware('auth:api')->group(function () {
Route::group(['prefix' => 'karyawan'], function () {
    Route::controller(KaryawanController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'findById');
        Route::post('/', 'create');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
    Route::controller(PersonalInformationController::class)->group(function () {
        Route::post('/informasi-personal/{karyawan_id}', 'save');
    });
    Route::controller(JobInformationController::class)->group(function () {
        Route::post('/informasi-pekerjaan/{karyawan_id}', 'save');
    });
    Route::controller(FamilyController::class)->group(function () {
        Route::post('/keluarga/{karyawan_id}', 'store');
    });
    // });
});

Route::group(['prefix' => 'department'], function () {
    Route::controller(DepartmentController::class)->group(function () {
        Route::post('/', 'store');
        Route::get('/', 'index');
    });
});


Route::group(['prefix' => 'kantor-cabang'], function () {
    Route::get('/', [KantorCabangController::class, 'index']);
    Route::get('/{id}', [KantorCabangController::class, 'show']);
    Route::post('/', [KantorCabangController::class, 'create']);
});

// http://localhost:8000/log-viewer for logging
// http://localhost:8000/telescope for review  performance
