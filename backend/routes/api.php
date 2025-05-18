<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [AuthController::class, 'currentUser'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/social/login', [AuthController::class, 'handleSocialLogin']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');