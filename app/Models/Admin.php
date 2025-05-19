<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        /**
        * Defines the relationship between the admin and the user.
        *
        * This function establishes a "belongsTo" relationship between the Admin model and the User model,
        * indicating that an admin is associated with a single user account.
        */
        return $this->belongsTo(User::class);
    }
}
