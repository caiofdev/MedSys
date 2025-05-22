<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\Appointment;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appointmentIds = Appointment::pluck('id')->shuffle();

        foreach ($appointmentIds as $id) {
            Payment::factory()->create([
                'appointment_id' => $id,
            ]);
        }
    }
}
