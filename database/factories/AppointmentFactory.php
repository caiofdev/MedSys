<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Doctor;
use App\Models\Patient;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $doctorIds = Doctor::pluck('id')->toArray();
        $patientIds = Patient::pluck('id')->toArray();

        return [
            'appointment_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'value' => $this->faker->randomFloat(2, 50, 500),
            'patient_id' => $this->faker->randomElement($patientIds),
            'doctor_id' => $this->faker->randomElement($doctorIds),
        ];
    }
}
