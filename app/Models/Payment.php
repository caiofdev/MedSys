<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'amount',
        'status',
        'payment_method',
        'transaction_code',
        'payload',
        'appointment_id',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    public function appointment()
    {
        /**
        * Defines the relationship between the payment and the appointment.
        *
        * This function establishes a "belongsTo" relationship between the Payment model and the Appointment model,
        * indicating that a payment is associated with a single appointment.
        */
        return $this->belongsTo(Appointment::class);
    }
}
