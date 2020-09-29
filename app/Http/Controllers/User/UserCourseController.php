<?php

namespace App\Http\Controllers\User;

use App\Course;
use App\Http\Controllers\Controller;
use App\UserCourse;
use Illuminate\Http\Request;

class UserCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $myCourses = UserCourse::where('user_id', auth()->id())->pluck('course_id');
        $courses = Course::withCount('users')->whereNotIn('id', $myCourses)->get();
        return response()->json([
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request, $id)
    {
        try {
            $course = Course::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Couse not found',
            ], 404);
        }

        $myCourses = UserCourse::where([
            'user_id' => auth()->id(),
            'course_id' => $id,
        ])->first();
        if (!empty($myCourses)) {
            return response()->json([
                'message' => 'You already subscibed in this course before',
            ], 404);
        }
        UserCourse::create([
            'user_id' => auth()->id(),
            'course_id' => $id,
        ]);

        return response()->json([
            'message' => 'You have subscribed successfully',
        ]);
    }
    public function mycourses()
    {
        $myCourses = UserCourse::where('user_id', auth()->id())->pluck('course_id');
        $courses = Course::whereIn('id', $myCourses)->get();
        return response()->json([
            'courses' => $courses,
        ]);
    }

    public function destroy($id)
    {
        try {
            $course = Course::findOrfail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Couse not found',
            ], 404);
        }
        try {
            $myCourses = UserCourse::where([
                'user_id' => auth()->id(),
                'course_id' => $id,
            ])->firstOrFail();
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'subscription not found',
            ], 404);
        }

        $myCourses->delete();
        return response()->json([
            'message' => 'You have unsubscribed successfully',
        ]);
    }

}
