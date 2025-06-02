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
            return response()->json([
                'error' => __('An unexpected error occurred while retrieving users.')
            ], 500);
        }
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->createUser($request->validated());
            return response()->json([
                'message' => __('user.created_successfully'),
                'user' => $user,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            return response()->json([
                'error' => __('An unexpected error occurred while creating the user.')
            ], 500);
        }
    }

    public function show(User $user): JsonResponse
    {
        try {
            return response()->json($this->userService->getUser($user));
        } catch (\Exception $e) {
            Log::error('Error retrieving user: ' . $e->getMessage());
            return response()->json([
                'error' => __('An unexpected error occurred while retrieving the user.')
            ], 500);
        }
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        try {
            $updatedUser = $this->userService->updateUser($user, $request->validated());
            return response()->json([
                'message' => __('user.updated_successfully'),
                'user' => $updatedUser,
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
            return response()->json([
                'error' => __('An unexpected error occurred while updating the user.')
            ], 500);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            $this->userService->deleteUser($user);
            return response()->json([
                'message' => __('user.deleted_successfully')
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage());
            return response()->json([
                'error' => __('An unexpected error occurred while deleting the user.')
            ], 500);
        }
    }
}
