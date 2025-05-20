<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Address;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'),
            'rg' => $this->faker->unique()->numerify('##.###.###'),
            'birth_date' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Other']),
            'phone' => $this->faker->unique()->numerify('(##) #####-####'),
            'emergency_contact_phone' => $this->faker->numerify('(##) #####-####'),
            'medical_history' => $this->faker->text(),
            'address_id' => Address::factory(),
        ];
    }
}
