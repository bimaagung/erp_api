<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class AuthContoller extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => ['required', 'email:rfc,dns', 'unique:users,email', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => ['required', 'min:8', 'regex:/^[a-zA-Z0-9]{8,}$/'],
            'retype_password' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::asError()
                ->withMessage($validator->errors())
                ->build();
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
        ]);


        $token = $user->createToken('auth_token')->plainTextToken;

        return ResponseBuilder::success([ //Response Builder: https://milantarami.github.io/laravel-api-response-builder/#/
            'user' => $user,
            'token' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }
}
