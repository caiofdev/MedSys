<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ReceptionistSeeder::class,
            DoctorSeeder::class,
            PatientSeeder::class,
            ConsultationSeeder::class,
            PrescriptionSeeder::class,
            ExamSeeder::class,
        ]);
    }
}
