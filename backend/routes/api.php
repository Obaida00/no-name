<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\ContractController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/social/login', [AuthController::class, 'handleSocialLogin']);
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Category Routes
Route::middleware("auth:api")->prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/hierarchy', [CategoryController::class, 'hierarchy']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    Route::get('/{id}/subcategories', [CategoryController::class, 'getWithSubcategories']);
    Route::get('/{id}/products', [CategoryController::class, 'getWithProducts']);
});

// Product Routes
Route::middleware("auth:api")->prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/expired', [ProductController::class, 'getExpired']);
    Route::get('/expiring-soon', [ProductController::class, 'getExpiringSoon']);
    Route::post('/search', [ProductController::class, 'search']);
    Route::post('/stocks/update', [ProductController::class, 'updateStocks']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});

// Shift Routes
Route::middleware("auth:api")->prefix('shifts')->group(function () {
    Route::get('/', [ShiftController::class, 'index']);
    Route::post('/', [ShiftController::class, 'store']);
    Route::get('/by-days', [ShiftController::class, 'getByDays']);
    Route::get('/available', [ShiftController::class, 'getAvailable']);
    Route::get('/{id}', [ShiftController::class, 'show']);
    Route::put('/{id}', [ShiftController::class, 'update']);
    Route::delete('/{id}', [ShiftController::class, 'destroy']);
});

// Contract Routes
Route::middleware("auth:api")->prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index']);
    Route::post('/', [ContractController::class, 'store']);
    Route::get('/active', [ContractController::class, 'getActive']);
    Route::get('/expired', [ContractController::class, 'getExpired']);
    Route::get('/ending-soon', [ContractController::class, 'getEndingSoon']);
    Route::get('/user/{userId}', [ContractController::class, 'getUserContracts']);
    Route::get('/{id}', [ContractController::class, 'show']);
    Route::put('/{id}', [ContractController::class, 'update']);
    Route::delete('/{id}', [ContractController::class, 'destroy']);
    Route::patch('/{id}/end', [ContractController::class, 'end']);
    Route::post('/{id}/renew', [ContractController::class, 'renew']);
});
