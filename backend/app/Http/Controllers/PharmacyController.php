<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePharmacyRequest;
use App\Http\Requests\UpdatePharmacyRequest;
use App\Models\Pharmacy;
use App\Services\PharmacyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class PharmacyController extends Controller
{
    protected PharmacyService $pharmacyService;

    public function __construct(PharmacyService $pharmacyService)
    {
        $this->pharmacyService = $pharmacyService;
    }

    public function index(): JsonResponse
    {
        try {
            $pharmacies = $this->pharmacyService->listUserPharmacies();
            return response()->json($pharmacies);
        } catch (\Exception $e) {
            Log::error('Error fetching pharmacies: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch pharmacies.'], 500);
        }
    }

    public function store(StorePharmacyRequest $request): JsonResponse
    {
        try {
            $pharmacy = $this->pharmacyService->createPharmacy($request->validated());
            return response()->json([
                'message' => 'Pharmacy created successfully.',
                'pharmacy' => $pharmacy,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating pharmacy: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create pharmacy.'], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $pharmacy = $this->pharmacyService->getPharmacyById($id);
            return response()->json($pharmacy);
        } catch (\Exception $e) {
            Log::error("Error fetching pharmacy #$id: " . $e->getMessage());
            return response()->json(['error' => 'Pharmacy not found.'], 404);
        }
    }

    public function update(UpdatePharmacyRequest $request, $id): JsonResponse
    {
        try {
            $pharmacy = $this->pharmacyService->updatePharmacy($id, $request->validated());
            return response()->json([
                'message' => 'Pharmacy updated successfully.',
                'pharmacy' => $pharmacy,
            ]);
        } catch (\Exception $e) {
            Log::error("Error updating pharmacy #$id: " . $e->getMessage());
            return response()->json(['error' => 'Failed to update pharmacy.'], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->pharmacyService->deletePharmacy($id);
            return response()->json(['message' => 'Pharmacy deleted successfully.']);
        } catch (\Exception $e) {
            Log::error("Error deleting pharmacy #$id: " . $e->getMessage());
            return response()->json(['error' => 'Failed to delete pharmacy.'], 500);
        }
    }
}
