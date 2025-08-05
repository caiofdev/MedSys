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

    public function store(Request $request)
    {
        
    }

    public function show(Patient $patient)
    {
        return response()->json([
            'id' => $patient->id,
            'name' => $patient->name,
            'email' => $patient->email,
            'cpf' => $patient->cpf,
            'phone' => $patient->phone,
            'gender' => $patient->gender,
            'birth_date' => $patient->birth_date,
            'emergency_contact' => $patient->emergency_contact,
            'medical_history' => $patient->medical_history,
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email,' . $patient->id,
            'phone' => 'required|string|max:20',
            'gender' => 'nullable|in:male,female,other',
            'emergency_contact' => 'nullable|string|max:20',
            'medical_history' => 'nullable|string',
        ]);

        try {
            $patient->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'gender' => $validated['gender'] ?? $patient->gender,
                'emergency_contact' => $validated['emergency_contact'] ?? $patient->emergency_contact,
                'medical_history' => $validated['medical_history'] ?? $patient->medical_history,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Paciente atualizado com sucesso.',
                'patient' => [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'email' => $patient->email,
                    'phone' => $patient->phone,
                    'cpf' => $patient->cpf,
                    'gender' => $patient->gender,
                    'birth_date' => $patient->birth_date,
                    'emergency_contact' => $patient->emergency_contact,
                    'medical_history' => $patient->medical_history,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar paciente: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Patient $patient)
    {
        
    }
}
