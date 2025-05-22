<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use HasFactory;

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
