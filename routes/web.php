<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ReceptionistController;
use App\Http\Controllers\PatientController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard')->middleware('user.type:admin');
    Route::get('admin/admins', [AdminController::class, 'index'])->name('admin.table')->middleware('user.type:admin');
    Route::get('admin/doctors', [DoctorController::class, 'index'])->name('doctor.table')->middleware('user.type:admin');
    Route::get('admin/receptionists', [ReceptionistController::class, 'index'])->name('receptionist.table')->middleware('user.type:admin');
    
    Route::get('admin/admins/{admin}', [AdminController::class, 'show'])->name('admin.show')->middleware('user.type:admin');
    Route::post('admin/admins', [AdminController::class, 'store'])->name('admin.store')->middleware('user.type:admin');
    Route::post('admin/admins/{admin}', [AdminController::class, 'update'])->name('admin.update.post')->middleware('user.type:admin');
    Route::put('admin/admins/{admin}', [AdminController::class, 'update'])->name('admin.update')->middleware('user.type:admin');
    Route::delete('admin/admins/{admin}', [AdminController::class, 'destroy'])->name('admin.destroy')->middleware('user.type:admin');

    Route::get('admin/doctors/{doctor}', [DoctorController::class, 'show'])->name('doctor.show')->middleware('user.type:admin');
    Route::post('admin/doctors', [DoctorController::class, 'store'])->name('doctor.store')->middleware('user.type:admin');
    Route::post('admin/doctors/{doctor}', [DoctorController::class, 'update'])->name('doctor.update.post')->middleware('user.type:admin');
    Route::put('admin/doctors/{doctor}', [DoctorController::class, 'update'])->name('doctor.update')->middleware('user.type:admin');
    Route::delete('admin/doctors/{doctor}', [DoctorController::class, 'destroy'])->name('doctor.destroy')->middleware('user.type:admin');
    
    Route::get('doctor/dashboard', [DashboardController::class, 'doctorDashboard'])->name('doctor.dashboard')->middleware('user.type:doctor');

    Route::get('receptionist/dashboard', [DashboardController::class, 'receptionistDashboard'])->name('receptionist.dashboard')->middleware('user.type:receptionist');
    Route::get('receptionist/patients', [PatientController::class, 'index'])->name('patient.table')->middleware('user.type:receptionist');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';