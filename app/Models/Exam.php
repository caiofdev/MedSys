<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_type',
        'result',
        'exam_file',
        'consultation_id',
    ];

    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }
}
