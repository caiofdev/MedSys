<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Consultation;

class ExamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'exam_type' => $this->faker->word(),
            'result' => $this->faker->sentence(),
            'exam_file' => $this->faker->filePath(),
            'consultation_id' => getUniqueModelId(Consultation::class, 'consultation_exam'),
        ];
    }
}
