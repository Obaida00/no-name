<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(): JsonResponse
    {
        try {
            $users = $this->userService->getAllUsers();
            return response()->json($users);
        } catch (\Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            return response()->json(['error' => 'error occurred while fetching users'], 500);
        }
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->createUser($request->validated());
            return response()->json([
                'message' => 'user created successfully!',
                'user' => $user,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            return response()->json(['error' => 'error occurred while creating user'], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'user not found '], 404);
            }

            return response()->json($this->userService->getUser($user));
        } catch (\Exception $e) {
            Log::error("Error fetching user with ID $id: " . $e->getMessage());
            return response()->json(['error' => 'error occurred while fetching user data'], 500);
        }
    }

    public function update(UpdateUserRequest $request, $id): JsonResponse
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'user not found '], 404);
            }

            $updatedUser = $this->userService->updateUser($user, $request->validated());
            return response()->json([
                'message' => 'user data updated succesfully',
                'user' => $updatedUser,
            ]);
        } catch (\Exception $e) {
            Log::error("Error updating user with ID $id: " . $e->getMessage());
            return response()->json(['error' => 'error occurred while updating user data'], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'user not found '], 404);
            }

            $this->userService->deleteUser($user);
            return response()->json(['message' => 'user deleted succesfully']);
        } catch (\Exception $e) {
            Log::error("Error deleting user with ID $id: " . $e->getMessage());
            return response()->json(['error' => 'error occurred while deleting user'], 500);
        }
    }
}
