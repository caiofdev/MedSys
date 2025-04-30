<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function admin()
    {
        /**
        * Defines the relationship between the user and the admin.
        *
        * This function establishes a "hasOne" relationship between the User model and the Admin model,
        * indicating that a user may have one admin profile.
        */
        return $this->hasOne(Admin::class);
    }

    public function receptionist()
    {
        /**
        * Defines the relationship between the user and the receptionist.
        * 
        * This function establishes a "hasOne" relationship between the User model and the Receptionist model,
        * indicating that a user may have one receptionist profile.
        */
        return $this->hasOne(Receptionist::class);
    }

    public function doctor()
    {
        /**
        * Defines the relationship between the user and the doctor.
        *
        * This function establishes a "hasOne" relationship between the User model and the Doctor model,
        * indicating that a user may have one doctor profile.
        */
        return $this->hasOne(Doctor::class);
    }
}
