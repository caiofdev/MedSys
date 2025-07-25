<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $userType = $user->getUserType();

        return match($userType) {
            'admin' => redirect()->route('admin.dashboard'),
            'doctor' => redirect()->route('doctor.dashboard'),
            'receptionist' => redirect()->route('receptionist.dashboard'),
            default => redirect()->route('login')->with('error', 'Usuário não identificado.'),
        };
    }

    public function adminDashboard()
    {
        return Inertia::render('dashboards/admin-dashboard');
    }

    public function doctorDashboard()
    {
        return Inertia::render('dashboards/doctor-dashboard');
    }

    public function receptionistDashboard()
    {
        return Inertia::render('dashboards/receptionist-dashboard');
    }
}