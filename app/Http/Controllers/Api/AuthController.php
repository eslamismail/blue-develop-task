<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Storage;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email|email',
            'password' => 'required|min:6',
        ]);

        $data = $request->only(['email', 'password']);
        if (auth()->attempt($data)) {
            $user = auth()->user();
            $user->accessToken = $user->createToken('user')->accessToken;

            return response()->json([
                'user' => $user,
            ]);
        }

        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|same:password',
            'image' => 'image|mimetypes:image/*|max:2048',
            'name' => 'required|string|min:6',
        ]);

        $data = $request->only(['email', 'name']);
        $data['password'] = bcrypt($request->password);
        if ($request->has('image')) {
            $data['image'] = 'uploads/' . Storage::disk('uploads')->put('user', $request->image);
        }
        $user = User::create($data);
        $user->accessToken = $user->createToken('user')->accessToken;

        return response()->json([
            'user' => $user,
        ]);

    }

    public function user()
    {
        $user = auth()->user();
        return response()->json([
            'user' => $user,
        ]);
    }

    public function logout()
    {
        $user = auth()->user()->token();
        $user->revoke();
    }
}
