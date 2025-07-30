<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        
        $doctors = Doctor::with(['user', 'specialty'])->when($search, function ($query) use ($search) {
            $query->whereHas('user', function ($userQuery) use ($search) {
                $userQuery->where('name', 'like', "%{$search}%");
            });
        })->paginate(8)->withQueryString();

        return Inertia::render('tables/doctor-table', [
            'doctors' => $doctors,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        
    }

    public function show(Doctor $doctor)
    {
        
    }

    public function edit(Doctor $doctor)
    {
        
    }

    public function update(Request $request, Doctor $doctor)
    {
        
    }

    public function destroy(Doctor $doctor)
    {
        
    }
}
