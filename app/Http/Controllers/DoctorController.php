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
        
        $doctors = Doctor::with(['user'])->when($search, function ($query) use ($search) {
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

    public function store(Request $request)
    {
        
    }

    public function show(Doctor $doctor)
    {
        $doctor->load('user');
        
        return response()->json([
            'id' => $doctor->id,
            'name' => $doctor->user->name,
            'email' => $doctor->user->email,
            'cpf' => $doctor->user->cpf,
            'phone' => $doctor->user->phone,
            'photo' => $doctor->user->photo ? asset('storage/' . $doctor->user->photo) : null,
            'birth_date' => $doctor->user->birth_date,
            'crm' => $doctor->crm,
        ]);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $doctor->user->id,
            'phone' => 'required|string|max:20',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ];

        if ($request->hasFile('photo')) {
            if ($doctor->user->photo && file_exists(public_path('storage/' . $doctor->user->photo))) {
                unlink(public_path('storage/' . $doctor->user->photo));
            }

            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/photos'), $filename);
            $updateData['photo'] = 'photos/' . $filename;
        }

        $doctor->user->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Médico atualizado com sucesso.',
            'doctor' => [
                'id' => $doctor->id,
                'name' => $doctor->user->name,
                'email' => $doctor->user->email,
                'phone' => $doctor->user->phone,
                'photo' => $doctor->user->photo ? asset('storage/' . $doctor->user->photo) : null,
                'crm' => $doctor->crm,
            ]
        ]);
    }

    public function destroy(Doctor $doctor)
    {
        
    }
}
