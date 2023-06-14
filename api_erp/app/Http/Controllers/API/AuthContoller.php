<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MilanTarami\ApiResponseBuilder\Facades\ResponseBuilder;

class AuthContoller extends Controller
{
    protected User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email:rfc,dns', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => ['required', 'min:8', 'regex:/^[a-zA-Z0-9]{8,}$/'],
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $credentials = $request->only('email', 'password');

        $token = auth()->attempt($credentials);
        if (!$token) {
            return $this->fail(__('auth.incorrect'));
        }

        $user = auth()->user();

        return $this->success([
            'user' => new UserResource($user),
            'token' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => ['required', 'email:rfc,dns', 'unique:users,email', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => ['required', 'min:8', 'regex:/^[a-zA-Z0-9]{8,}$/'],
            'retype_password' => 'required|same:password'
        ]);

        $validator->setCustomMessages([
            'email.unique' => __('auth.unique_email'),
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors()->first());
        }

        $user = $this->user->create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
        ]);

        $token = auth()->login($user);

        return $this->success([
            'user' => new UserResource($user),
            'token' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }
}
