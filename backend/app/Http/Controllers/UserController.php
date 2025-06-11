<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json(UserResource::collection($users));
    }

    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json([
            'message' => __('user.created_successfully'),
            'user' => new UserResource($user)
        ], 201);
    }

    public function show(string $id)
    {
        $user = $this->userService->getUser($id);

        if (!$user) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }

        return response()->json(new UserResource($user));
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        $user = $this->userService->updateUser($id, $request->validated());

        if (!$user) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }

        return response()->json([
            'message' => __('user.updated_successfully'),
            'user' => $user,
        ]);
    }

    public function destroy(string $id)
    {
        $result = $this->userService->deleteUser($id);

        if (!$result) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }

        return response()->json([
            'message' => __('user.deleted_successfully')
        ]);
    }
}
