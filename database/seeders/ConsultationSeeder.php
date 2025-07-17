<?php

namespace Database\Seeders;

use App\Models\Consultation;
use Illuminate\Database\Seeder;

class ConsultationSeeder extends Seeder
{
    public function run(): void
    {
        Consultation::factory()->count(10)->create();
    }
}
