<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Str;

class ForgetpasswordController extends Controller
{
    public function forget(Request $request)
    {
        $rules = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        //Create Password Reset Token
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => Str::random(60),
            'created_at' => Carbon::now(),
        ]);
        //Get the token just created above
        $tokenData = DB::table('password_resets')
            ->where('email', $request->email)->first();
        if ($this->sendResetEmail($request->email, $tokenData->token)) {
            return response()->json(['message' => 'A reset link has been sent to your email address.'], 200);
        } else {
            return response()->json(['message' => 'A Network Error occurred. Please try again.'], 400);
        }
    }
    public function sendResetEmail($email, $token)
    {
        $user = User::where('email', $email)->first();
        $data['from'] = env('MAIL_USERNAME');
        $data['subject'] = 'Eslam task forget password';
        $data['link'] = url('reset/' . $token . '?email=' . urlencode($user->email));
        try {

            \Mail::send('email', $data, function ($message) use ($data, $user) {
                $message->from($data['from']);
                $message->to($user->email, $user->email);
                $message->subject($data['subject']);
            });
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6',
            'password_confirmation' => 'required|same:password',
        ]);

        $tokenData = DB::table('password_resets')
            ->where('token', $request->token)->first();
        if (!$tokenData) {
            return response()->json(['error' => 'invalid token!'], 400);
        }
        $user = User::where('email', $tokenData->email)->first();
        if (!$user) {
            return response()->json(['error' => 'Email not found'], 400);
        }
        $data['password'] = bcrypt($request->password);
        $user->update($data);
        DB::table('password_resets')->where('email', $user->email)
            ->delete();

        return response()->json([
            'message' => 'You have reset your password successfully',
        ]);
    }
}
