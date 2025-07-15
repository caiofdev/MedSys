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
        'number',
    ];

    public function patients()
    {
        return $this->hasMany(Patient::class);
    }
}
