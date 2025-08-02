<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        
        $patients = Patient::when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })->paginate(8)->withQueryString();

        return Inertia::render('tables/patient-table', [
            'patients' => $patients,
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

    public function show(Patient $patient)
    {
        
    }

    public function edit(Patient $patient)
    {
        
    }

    public function update(Request $request, Patient $patient)
    {
        
    }

    public function destroy(Patient $patient)
    {
        
    }
}
