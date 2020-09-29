<?php

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

Route::post('/login', 'Api\AdminAuthController@login');
Route::group(['middleware' => 'auth:admin'], function () {
    Route::post('/logout', 'Api\AdminAuthController@logout');
    Route::get('/', 'Api\AdminAuthController@user');
    Route::resource('/students', 'Api\UserController');
    Route::post('/students/{id}', 'Api\UserController@update');

    Route::resource('/courses', 'Api\CourseController');

});
