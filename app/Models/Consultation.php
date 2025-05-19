<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'symptoms',
        'diagnosis',
        'notes',
        'appointment_id',
    ];

    public function appointment()
    {
        /**
        * Defines the relationship between the consultation and the appointment.
        *
        * This function establishes a "belongsTo" relationship between the Consultation model and the Appointment model,
        * indicating that a consultation is associated with a single appointment.
        */
        return $this->belongsTo(Appointment::class);
    }

    public function prescriptions()
    {
        /**
        * Defines the relationship between the consultation and the prescriptions.
        *
        * This function establishes a "hasMany" relationship between the Consultation model and the Prescription model,
        * indicating that a consultation can generate multiple prescriptions.
        */
        return $this->hasMany(Prescription::class);
    }

    public function exams()
    {
        /**
        * Defines the relationship between the consultation and the exams.
        *
        * This function establishes a "hasMany" relationship between the Consultation model and the Exam model,
        * indicating that a consultation can include multiple exams.
        */
        return $this->hasMany(Exam::class);
    }
}
