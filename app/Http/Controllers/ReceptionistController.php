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
        
    }

    public function destroy(Receptionist $receptionist)
    {
        
    }
}
