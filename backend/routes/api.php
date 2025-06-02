<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/social/login', [AuthController::class, 'handleSocialLogin']);

Route::middleware('auth:api')->group(function () {
    //AuthController routes
    Route::get('/user', [AuthController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    //UserController routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
