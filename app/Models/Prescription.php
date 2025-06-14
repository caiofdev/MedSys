<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'medication_name',
        'dosage',
        'instructions',
        'consultation_id',
    ];

    public function consultation()
    {
        /**
        * Defines the relationship between the prescription and the consultation.
        *
        * This function establishes a "belongsTo" relationship between the Prescription model and the Consultation model,
        * indicating that a prescription is associated with a single consultation.
        */
        return $this->belongsTo(Consultation::class);
    }
}
