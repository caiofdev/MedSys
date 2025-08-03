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
            'photo' => $admin->user->photo,
            'is_master' => $admin->is_master,
        ]);
    }

    public function edit(Admin $admin)
    {
        
    }

    public function update(Request $request, Admin $admin)
    {
        
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
