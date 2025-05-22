<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Consultation;
use App\Models\Appointment;

class ConsultationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appointmentIds = Appointment::pluck('id')->shuffle();
        
        foreach ($appointmentIds as $id) {
            Consultation::factory()->create([
                'appointment_id' => $id,
            ]);
        }
    }
}
