<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receptionist extends Model
{
    protected $fillable = [
        'registration_number',
        'phone',
        'user_id',
    ];

    public function user()
    {
        /**
        * Defines the relationship between the receptionist and the user.
        *
        * This function establishes a "belongsTo" relationship between the Receptionist model and the User model,
        * indicating that a receptionist is associated with a single user account.
        */
        return $this->belongsTo(User::class);
    }
}
