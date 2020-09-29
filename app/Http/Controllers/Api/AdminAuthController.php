<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:admins,email|email|min:3',
            'password' => 'required|min:6',
        ]);
        $data = $request->only(['email', 'password']);
        if (auth()->guard('admins')->attempt($data)) {
            $admin = auth()->guard('admins')->user();
            $admin->accessToken = $admin->createToken('admin')->accessToken;
            return response()->json([
                'admin' => $admin,
            ]);
        }
        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }
    public function user()
    {
        $admin = auth()->guard('admin')->user();
        return response()->json([
            'admin' => $admin,
        ]);
    }
    public function logout()
    {
        $user = auth()->guard('admin')->user()->token();
        $user->revoke();
    }
}
