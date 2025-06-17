<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function createUser(array $data)
    {
        $password = Hash::make($data['password']);

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $password,
            'address' => $data['address'],
            'gender' => $data['gender'],
            'age' => $data['age'],
        ]);
    }

    public function getUser(string $id)
    {
        return User::find($id);
    }

    public function updateUser(string $id, array $data)
    {
        $user = User::find($id);
        $user->update($data);
        return $user;
    }


    public function deleteUser(string $id)
    {
        $user = User::find($id);

        if (!$user)
            return false;

        $user->delete();
        return true;
    }
}
