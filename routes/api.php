<?php

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

Route::post('/login', 'Api\AuthController@login');
Route::post('/register', 'Api\AuthController@register');
Route::post('/forgetpassword', 'Api\ForgetpasswordController@forget');
Route::post('/resetPassword', 'Api\ForgetpasswordController@resetPassword');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user', 'Api\AuthController@user');
    Route::post('/logout', 'Api\AuthController@logout');
    Route::get('/courses', 'User\UserCourseController@index');
    Route::get('/mycourses', 'User\UserCourseController@mycourses');
    Route::post('/courses/{id}', 'User\UserCourseController@store');
    Route::delete('/courses/{id}', 'User\UserCourseController@destroy');

});
