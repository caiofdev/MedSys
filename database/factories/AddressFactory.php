<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    public function definition(): array
    {
        return [
            'country' => $this->faker->country(),
            'state' => $this->faker->state(),
            'city' => $this->faker->city(),
            'street' => $this->faker->streetName(),
            'neighborhood' => $this->faker->word(),
            'postal_code' => $this->faker->postcode(),
            'number' => $this->faker->buildingNumber(),
        ];
    }
}
