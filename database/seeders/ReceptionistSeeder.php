<?php

namespace Database\Seeders;

use App\Models\Receptionist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceptionistSeeder extends Seeder
{
    public function run(): void
    {
        Receptionist::factory()->count(5)->create();
    }
}
