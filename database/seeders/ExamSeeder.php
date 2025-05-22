<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\Consultation;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $consultationIds = Consultation::pluck('id')->shuffle();

        foreach ($consultationIds as $id) {
            Exam::factory()->create([
                'consultation_id' => $id,
            ]);
        }
    }
}
