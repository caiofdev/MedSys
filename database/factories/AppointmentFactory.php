<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Receptionist;

class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'appointment_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'value' => $this->faker->randomFloat(2, 50, 500),
            'doctor_id' => Doctor::factory(),
            'patient_id' => Patient::factory(),
            'receptionist_id' => Receptionist::factory(),
        ];
    }
}
