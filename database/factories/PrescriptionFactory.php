<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medication_name' => $this->faker->word(),
            'dosage' => $this->faker->numberBetween(1, 100) . ' mg',
            'instructions' => $this->faker->sentence(),
        ];
    }
}
