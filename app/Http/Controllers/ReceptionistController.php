<?php

namespace App\Http\Controllers;

use App\Models\Receptionist;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceptionistController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        
        $receptionists = Receptionist::with('user')->when($search, function ($query) use ($search) {
                $query->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%");
                });
            })->paginate(8)->withQueryString();

        return Inertia::render('tables/receptionist-table', [
            'receptionists' => $receptionists,
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
            'register_number' => 'required|string|max:20|unique:receptionists,registration_number',
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

            $receptionist = Receptionist::create([
                'user_id' => $user->id,
                'registration_number' => $validated['register_number'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Recepcionista criado com sucesso.',
                'receptionist' => [
                    'id' => $receptionist->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'cpf' => $user->cpf,
                    'phone' => $user->phone,
                    'photo' => $user->photo ? asset('storage/' . $user->photo) : null,
                    'birth_date' => $user->birth_date,
                    'register_number' => $receptionist->registration_number,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar recepcionista: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(Receptionist $receptionist)
    {
        $receptionist->load('user');
        
        return response()->json([
            'id' => $receptionist->id,
            'name' => $receptionist->user->name,
            'email' => $receptionist->user->email,
            'cpf' => $receptionist->user->cpf,
            'phone' => $receptionist->user->phone,
            'photo' => $receptionist->user->photo ? asset('storage/' . $receptionist->user->photo) : null,
            'birth_date' => $receptionist->user->birth_date,
            'register_number' => $receptionist->registration_number,
        ]);
    }

    public function update(Request $request, Receptionist $receptionist)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $receptionist->user->id,
            'phone' => 'required|string|max:20',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ];

        if ($request->hasFile('photo')) {
            if ($receptionist->user->photo && file_exists(public_path('storage/' . $receptionist->user->photo))) {
                unlink(public_path('storage/' . $receptionist->user->photo));
            }

            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/photos'), $filename);
            $updateData['photo'] = 'photos/' . $filename;
        }

        $receptionist->user->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Recepcionista atualizado com sucesso.',
            'receptionist' => [
                'id' => $receptionist->id,
                'name' => $receptionist->user->name,
                'email' => $receptionist->user->email,
                'phone' => $receptionist->user->phone,
                'photo' => $receptionist->user->photo ? asset('storage/' . $receptionist->user->photo) : null,
                'register_number' => $receptionist->registration_number,
            ]
        ]);
    }

    public function destroy(Receptionist $receptionist)
    {
        
    }
}
