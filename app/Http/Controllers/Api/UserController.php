<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = User::withCount('courses')->get();
        return response()->json([
            'students' => $students,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|min:3|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'image' => 'image|mimetypes:image/*|max:2048',
            'password_confirmation' => 'required|same:password',
        ]);
        $data = $request->only(['name', 'email']);
        $data['password'] = bcrypt($request->password);
        if ($request->has('image')) {
            $data['image'] = 'uploads/' . Storage::disk('uploads')->put('user', $request->image);
        }
        User::create($data);
        return response()->json(['message' => 'Student created successfully']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = User::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'student not found',
            ], 404);
        }
        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|min:3|max:255|unique:users,email,' . $id,
            'password' => 'min:6',
            'password_confirmation' => 'same:password',
            'image' => 'image|mimetypes:image/*|max:2048',
        ]);

        $data = $request->only(['name', 'email']);
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->password);
        }

        try {
            $student = User::findOrfail($id);

        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'student not found',
            ], 404);
        }

        if ($request->has('image')) {
            if (file_exists(public_path($student->image))) {
                unlink(public_path($student->image));
            }
            $data['image'] = 'uploads/' . Storage::disk('uploads')->put('user', $request->image);
        }

        $student->update($data);

        return response()->json(['message' => 'Student updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            $student = User::findOrfail($id);
            if (file_exists(public_path($student->image))) {
                unlink(public_path($student->image));
            }
            $student->delete();
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'student not found',
            ], 404);
        }
        return response()->json(['message' => 'Student deleted successfully']);
    }
}
