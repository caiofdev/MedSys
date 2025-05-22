<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Prescription;
use App\Models\Consultation;

class PrescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $consultationIds = Consultation::pluck('id')->shuffle();

        foreach ($consultationIds as $id) {
            Prescription::factory()->create([
                'consultation_id' => $id,
            ]);
        }
    }
}
