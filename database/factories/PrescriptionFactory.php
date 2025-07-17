<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Consultation;

class PrescriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'medication' => $this->faker->word(),
            'dosage' => $this->faker->numberBetween(1, 100) . ' mg',
            'instructions' => $this->faker->sentence(),
            'consultation_id' => getUniqueModelId(Consultation::class, 'consultation_prescription'),
        ];
    }
}
