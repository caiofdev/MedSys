<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'crm',
        'user_id',
        'specialty_id',
    ];

    public function user()
    {
        /**
        * Defines the relationship between the doctor and the user.
        *
        * This function establishes a "belongsTo" relationship between the Doctor model and the User model,
        * indicating that a doctor is associated with a single user account.
        */
        return $this->belongsTo(User::class);
    }

    public function specialty()
    {
        /**
        * Defines the relationship between the doctor and the specialty.
        *
        * This function establishes a "belongsTo" relationship between the Doctor model and the Specialty model,
        * indicating that a doctor is assigned to a specific specialty.
        */
        return $this->belongsTo(Specialty::class);
    }

    public function appointments()
    {
        /**
        * Defines the relationship between the doctor and the appointments.
        *
        * This function establishes a "hasMany" relationship between the Doctor model and the Appointment model,
        * indicating that a doctor can have multiple appointments.
        */
        return $this->hasMany(Appointment::class);
    }
}
