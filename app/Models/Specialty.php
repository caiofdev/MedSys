<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function doctors()
    {
        /**
        * Defines the relationship between the specialty and the doctors.
        *
        * This function establishes a "hasMany" relationship between the Specialty model and the Doctor model,
        * indicating that a specialty can be associated with multiple doctors.
        */
        return $this->hasMany(Doctor::class);
    }
}
