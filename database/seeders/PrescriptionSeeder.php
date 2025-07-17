<?php

namespace Database\Seeders;

use App\Models\Prescription;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class PrescriptionSeeder extends Seeder
{
    public function run(): void
    {
        Prescription::factory()->count(10)->create();
    }
}
