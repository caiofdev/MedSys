<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'cpf' => 'required|string|max:14|unique:users,cpf',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'birth_date' => 'required|date',
            'crm' => 'required|string|max:20|unique:doctors,crm',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'cpf' => $validated['cpf'],
                'phone' => $validated['phone'],
                'password' => bcrypt($validated['password']),
                'birth_date' => $validated['birth_date'],
            ];

            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('storage/photos'), $filename);
                $userData['photo'] = 'photos/' . $filename;
            }

            $user = User::create($userData);

            $doctor = Doctor::create([
                'user_id' => $user->id,
                'crm' => $validated['crm'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Médico criado com sucesso.',
                'doctor' => [
                    'id' => $doctor->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'cpf' => $user->cpf,
                    'phone' => $user->phone,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'birth_date' => $user->birth_date,
                    'crm' => $doctor->crm,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar médico: ' . $e->getMessage()
            ], 500);
        }
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
        try {
            if ($doctor->user->photo && file_exists(public_path('storage/' . $doctor->user->photo))) {
                unlink(public_path('storage/' . $doctor->user->photo));
            }

            $doctor->user->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Médico deletado com sucesso.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar médico: ' . $e->getMessage()
            ], 500);
        }
    }

    public function startConsultation()
    {
        return Inertia::render('doctors/start-consultation');
    }
}
