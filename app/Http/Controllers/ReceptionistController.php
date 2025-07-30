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

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        
    }

    public function show(Receptionist $receptionist)
    {
        
    }

    public function edit(Receptionist $receptionist)
    {
        
    }

    public function update(Request $request, Receptionist $receptionist)
    {
        
    }

    public function destroy(Receptionist $receptionist)
    {
        
    }
}
