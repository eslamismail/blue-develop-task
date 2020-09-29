<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $appends = [
        'subscibed_at',
    ];
    public function getSubscibedAtAttribute()
    {
        if (auth()->user()) {
            try {
                $sub = UserCourse::where([
                    'course_id' => $this->id,
                    'user_id' => auth()->id(),
                ])->first();
                return $sub->created_at;
            } catch (\Throwable $th) {
                return null;
            }
        }
        return null;
    }
    public function users()
    {
        return $this->hasMany(UserCourse::class, 'course_id')->with('user');
    }
}
