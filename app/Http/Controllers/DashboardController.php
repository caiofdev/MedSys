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
        $user = auth()->user();
        
        $dashboardData = [
            'user' => [
                'name' => $user->name,
                'avatar' => $user->photo ? asset('storage/' . $user->photo) : '/admin-pic.png',
                'role' => 'ADMINISTRADOR',
                'is_master' => $user->admin->is_master ?? false,
            ],
            'stats' => [
                'total_admins' => \App\Models\Admin::count(),
                'total_doctors' => \App\Models\Doctor::count(),
                'total_receptionists' => \App\Models\Receptionist::count(),
                'total_users' => \App\Models\User::count(),
            ],
            'recent_activities' => [
            ]
        ];

        return Inertia::render('dashboards/admin-dashboard', array_merge($dashboardData, ['userRole' => 'admin']));
    }

    public function doctorDashboard()
    {
        $user = auth()->user();
        $doctor = $user->doctor;
        
        $dashboardData = [
            'user' => [
                'name' => $user->name,
                'avatar' => $user->photo ? asset('storage/' . $user->photo) : '/doctor-pic.png',
                'role' => 'DOUTOR',
                'crm' => $doctor->crm ?? null,
                'specialty' => $doctor->specialty->name ?? 'Não definido',
            ],
            'appointments' => [
                'today' => $doctor->appointments()->whereDate('appointment_date', today())->count(),
                'week' => $doctor->appointments()->whereBetween('appointment_date', [now()->startOfWeek(), now()->endOfWeek()])->count(),
                'month' => $doctor->appointments()->whereMonth('appointment_date', now()->month)->count(),
            ],
            'upcoming_appointments' => $doctor->appointments()
                ->where('appointment_date', '>=', now())
                ->orderBy('appointment_date')
                ->limit(5)
                ->get(),
        ];

        return Inertia::render('dashboards/doctor-dashboard', array_merge($dashboardData, ['userRole' => 'doctor']));
    }

    public function receptionistDashboard()
    {
        $user = auth()->user();
        $receptionist = $user->receptionist;
        
        $dashboardData = [
            'user' => [
                'name' => $user->name,
                'avatar' => $user->photo ? asset('storage/' . $user->photo) : '/recepcionist-pic.png',
                'role' => 'RECEPCIONISTA',
                'registration_number' => $receptionist->registration_number ?? null,
            ],
            'daily_summary' => [
                'appointments_today' => \App\Models\Appointment::whereDate('appointment_date', today())->count(),
                'completed_today' => \App\Models\Appointment::whereDate('appointment_date', today())->where('status', 'completed')->count(),
                'pending_today' => \App\Models\Appointment::whereDate('appointment_date', today())->where('status', 'scheduled')->count(),
                'cancelled_today' => \App\Models\Appointment::whereDate('appointment_date', today())->where('status', 'canceled')->count(),
            ],
            'weekly_appointments' => \App\Models\Appointment::whereBetween('appointment_date', [now()->startOfWeek(), now()->endOfWeek()])
                ->orderBy('appointment_date')
                ->get(),
        ];

        return Inertia::render('dashboards/receptionist-dashboard', array_merge($dashboardData, ['userRole' => 'receptionist']));
    }
}