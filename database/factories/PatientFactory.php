<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Address;

class PatientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'cpf' => $this->faker->unique()->numerify('###########'),
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),
            'phone' => $this->faker->phoneNumber(),
            'birth_date' => $this->faker->date(),
            'emergency_contact' => $this->faker->phoneNumber(),
            'medical_history' => $this->faker->text(200),
        ];
    }
}
