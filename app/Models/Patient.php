<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'name',
        'email',
        'cpf',
        'rg',
        'birth_date',
        'gender',
        'phone',
        'emergency_contact_phone',
        'medical_history',
        'address_id',
    ];

    public function address()
    {
        /**
        * Defines the relationship between the patient and the address.
        *
        * This function establishes a "hasOne" relationship between the Patient model and the Address model,
        * indicating that a patient has a single associated address.
        */
        return $this->hasOne(Address::class);
    }

    public function appointments()
    {
        /**
        * Defines the relationship between the patient and the appointments.
        *
        * This function establishes a "hasMany" relationship between the Patient model and the Appointment model,
        * indicating that a patient can have multiple appointments.
        */
        return $this->hasMany(Appointment::class);
    }
}
