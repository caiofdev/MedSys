<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Consultation;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exam_type' => $this->faker->word(),
            'exam_result' => $this->faker->sentence(),
            'exam_file' => $this->faker->filePath(),
            'consultation_id' => Consultation::factory(), 
        ];
    }
}
