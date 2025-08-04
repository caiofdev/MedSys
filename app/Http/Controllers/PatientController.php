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
        
        $patients = Patient::with('address')->when($search, function ($query) use ($search) {
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
        $patient->load('address');
        
        return response()->json([
            'id' => $patient->id,
            'name' => $patient->name,
            'email' => $patient->email,
            'cpf' => $patient->cpf,
            'phone' => $patient->phone,
            'photo' => $patient->photo ? asset('storage/' . $patient->photo) : null,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'emergency_contact' => $patient->emergency_contact,
            'medical_history' => $patient->medical_history,
            'address' => $patient->address ? [
                'country' => $patient->address->country,
                'state' => $patient->address->state,
                'city' => $patient->address->city,
                'street' => $patient->address->street,
                'neighborhood' => $patient->address->neighborhood,
                'postal_code' => $patient->address->postal_code,
                'number' => $patient->address->number,
            ] : null,
        ]);
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
