<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ReceptionistController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');



Route::get('/patient-table', function () {
    return Inertia::render('tables/patient-table');
})->name('patient-table');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard')->middleware('user.type:admin');
    Route::get('admin/admins', [AdminController::class, 'index'])->name('admin.table')->middleware('user.type:admin');
    Route::get('admin/doctors', [DoctorController::class, 'index'])->name('doctor-table')->middleware('user.type:admin');
    Route::get('admin/receptionists', [ReceptionistController::class, 'index'])->name('receptionist-table')->middleware('user.type:admin');


    Route::get('doctor/dashboard', [DashboardController::class, 'doctorDashboard'])->name('doctor.dashboard')->middleware('user.type:doctor');

    Route::get('receptionist/dashboard', [DashboardController::class, 'receptionistDashboard'])->name('receptionist.dashboard')->middleware('user.type:receptionist');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';