<?php

namespace App\Http\Controllers\Api;

use App\Course;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courses = Course::withCount('users')->get();
        return response()->json([
            'courses' => $courses,
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
            'name' => 'required|string|min:3',
        ]);

        $data = $request->only(['name']);
        Course::create($data);

        return response()->json([
            'message' => 'course created successfully',
        ]);

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
            $course = Course::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Course not found',
            ], 404);
        }
        return response()->json([
            'course' => $course,
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
            'name' => 'required|string|min:3',
        ]);
        try {
            $course = Course::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Couse not found',
            ], 404);
        }
        $data = $request->only(['name']);
        $course->update($data);
        return response()->json([
            'message' => 'Course updated successfully',
        ]);
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
            $course = Course::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Course not found',
            ], 404);
        }
        $course->delete();
        return response()->json([
            'message' => 'Course deleted successfully',
        ]);
    }
}
