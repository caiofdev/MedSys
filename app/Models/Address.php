<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'country',
        'state',
        'city',
        'street',
        'neighborhood',
        'postal_code',
        'building_number',
    ];

    public function patient()
    {
        /**
        * Defines the relationship between the address and the patient.
        *
        * This function establishes a "belongsTo" relationship between the Address model and the Patient model,
        * indicating that an address is associated with a single patient.
        */
        return $this->belongsTo(Patient::class);
    }
}
