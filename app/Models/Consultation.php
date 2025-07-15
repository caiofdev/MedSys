<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'symptoms',
        'diagnosis',
        'notes',
        'appointment_id',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function prescription()
    {
        return $this->hasOne(Prescription::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}
