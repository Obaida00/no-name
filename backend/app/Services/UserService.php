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
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'address' => $data['address'] ,
            'gender' => $data['gender'] ,
            'age' => $data['age'],
        ]);
    }

    public function getUser(User $user)
    {
        return $user;
    }

    public function updateUser(User $user, array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $user;
    }


    public function deleteUser(User $user)
    {
        $user->delete();
        return true;
    }
}
