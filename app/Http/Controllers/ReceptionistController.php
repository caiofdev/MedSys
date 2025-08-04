<?php

namespace App\Http\Controllers;

use App\Models\Receptionist;
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
