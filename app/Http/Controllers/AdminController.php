<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        
        $admins = Admin::with('user')->when($search, function ($query) use ($search) {
            $query->whereHas('user', function ($userQuery) use ($search) {
                $userQuery->where('name', 'like', "%{$search}%");
            });
        })->paginate(8)->withQueryString();

        return Inertia::render('tables/admin-table', [
            'admins' => $admins,
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

    public function show(Admin $admin)
    {
        $admin->load('user');
        
        return response()->json([
            'id' => $admin->id,
            'name' => $admin->user->name,
            'email' => $admin->user->email,
            'cpf' => $admin->user->cpf,
            'phone' => $admin->user->phone,
            'photo' => $admin->user->photo ? asset('storage/' . $admin->user->photo) : null,
            'is_master' => $admin->is_master,
        ]);
    }

    public function edit(Admin $admin)
    {
        
    }

    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $admin->user->id,
            'phone' => 'required|string|max:20',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ];

        if ($request->hasFile('photo')) {
            if ($admin->user->photo && file_exists(public_path('storage/' . $admin->user->photo))) {
                unlink(public_path('storage/' . $admin->user->photo));
            }

            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/photos'), $filename);
            $updateData['photo'] = 'photos/' . $filename;
        }

        $admin->user->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Administrador atualizado com sucesso.',
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->user->name,
                'email' => $admin->user->email,
                'phone' => $admin->user->phone,
                'photo' => $admin->user->photo ? asset('storage/' . $admin->user->photo) : null,
            ]
        ]);
    }

    public function destroy(Admin $admin)
    {
        if ($admin->is_master) {
            $masterCount = Admin::where('is_master', true)->count();
            if ($masterCount <= 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'Não é possível deletar o último administrador master do sistema.'
                ], 400);
            }
        }

        try {
            $admin->user->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Administrador deletado com sucesso.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar administrador: ' . $e->getMessage()
            ], 500);
        }
    }
}
