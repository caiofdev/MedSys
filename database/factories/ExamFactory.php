<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Consultation;

class ExamFactory extends Factory
{
    private static $usedConsultationIds = [];

    public function definition(): array
    {
        return [
            'exam_type' => $this->faker->word(),
            'result' => $this->faker->sentence(),
            'exam_file' => $this->faker->filePath(),
            'consultation_id' => $this->getUniqueConsultationId(),
        ];
    }

    private function getUniqueConsultationId()
    {
        $availableIds = Consultation::pluck('id')
            ->diff(self::$usedConsultationIds)
            ->values()
            ->toArray();

        if (empty($availableIds)) {
            self::$usedConsultationIds = [];
            $availableIds = Consultation::pluck('id')->toArray();
        }

        $selectedId = $this->faker->randomElement($availableIds);
        
        self::$usedConsultationIds[] = $selectedId;

        return $selectedId;
    }    
}
