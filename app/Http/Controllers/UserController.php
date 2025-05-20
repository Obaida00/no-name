<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'address' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'age' => 'nullable|integer|min:0',
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        return User::create($validated);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        if (!$user) {
            return response()->json([
                'Message' => 'Profile Not Changed',
                'Errors' => 'User is not login',
            ],401);
        }
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'address' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'age' => 'nullable|integer|min:0',
            'password' => 'nullable|string|min:6',
        ]);

        if ($validated->fails()) {
            return response()->json([
                'Message'=>'Profile Not Changed!',
                'Errors'=> $validated->errors()
            ],422);
        }

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return $user;
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
