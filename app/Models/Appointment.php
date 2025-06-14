<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_date',
        'status',
        'value',
        'patient_id',
        'doctor_id',
    ];

    public function doctor()
    {
        /**
        * Defines the relationship between the appointment and the doctor.
        *
        * This function establishes a "belongsTo" relationship between the Appointment model and the Doctor model,
        * indicating that an appointment is associated with a single doctor.
        */
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        /**
        * Defines the relationship between the appointment and the patient.
        *
        * This function establishes a "belongsTo" relationship between the Appointment model and the Patient model,
        * indicating that an appointment is associated with a single patient.
        */
        return $this->belongsTo(Patient::class);
    }

    public function consultation()
    {
        /**
        * Defines the relationship between the appointment and the consultation.
        *
        * This function establishes a "hasOne" relationship between the Appointment model and the Consultation model,
        * indicating that an appointment can have one consultation.
        */
        return $this->hasOne(Consultation::class);
    }

    public function payment()
    {
        /**
        * Defines the relationship between the appointment and the payment.
        *
        * This function establishes a "hasOne" relationship between the Appointment model and the Payment model,
        * indicating that an appointment can have one payment.
        */
        return $this->hasOne(Payment::class);
    }
}
