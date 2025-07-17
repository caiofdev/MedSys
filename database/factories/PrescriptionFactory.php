<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Consultation;

class PrescriptionFactory extends Factory
{
    private static $usedConsultationIds = [];

    public function definition(): array
    {
        return [
            'medication' => $this->faker->word(),
            'dosage' => $this->faker->numberBetween(1, 100) . ' mg',
            'instructions' => $this->faker->sentence(),
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
