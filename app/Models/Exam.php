<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_type',
        'exam_result',
        'exam_file',
        'consultation_id',
    ];

    public function consultation()
    {
        /**
        * Defines the relationship between the exam and the consultation.
        *
        * This function establishes a "belongsTo" relationship between the Exam model and the Consultation model,
        * indicating that an exam is associated with a single consultation.
        */
        return $this->belongsTo(Consultation::class);
    }
}
