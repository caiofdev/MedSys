<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard')->middleware('user.type:admin');
    Route::get('doctor/dashboard', [DashboardController::class, 'doctorDashboard'])->name('doctor.dashboard')->middleware('user.type:doctor');
    Route::get('receptionist/dashboard', [DashboardController::class, 'receptionistDashboard'])->name('receptionist.dashboard')->middleware('user.type:receptionist');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';