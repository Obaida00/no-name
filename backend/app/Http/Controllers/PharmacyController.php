<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePharmacyRequest;
use App\Http\Requests\UpdatePharmacyRequest;
use App\Http\Resources\PharmacyResource;
use App\Services\PharmacyService;
use Illuminate\Http\JsonResponse;

class PharmacyController extends Controller
{
    protected PharmacyService $pharmacyService;

    public function __construct(PharmacyService $pharmacyService)
    {
        $this->pharmacyService = $pharmacyService;
    }

    public function index(): JsonResponse
    {
        $pharmacies = $this->pharmacyService->listUserPharmacies();
        return response()->json(PharmacyResource::collection($pharmacies));
    }

    public function store(StorePharmacyRequest $request): JsonResponse
    {
        $pharmacy = $this->pharmacyService->createPharmacy($request->validated());
        return response()->json([
            'message' => 'Pharmacy created successfully.',
            'pharmacy' => new PharmacyResource($pharmacy),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $pharmacy = $this->pharmacyService->getPharmacyById($id);
        if(!$pharmacy){
            return response()->json([
                'message' => 'Pharmacy not found.'],
           404);
        }
        return response()->json(new PharmacyResource($pharmacy));
    }

    public function update(UpdatePharmacyRequest $request, string $id): JsonResponse
    {
        $pharmacy = $this->pharmacyService->updatePharmacy($id, $request->validated());
        if($pharmacy){
            return response()->json([
                'message' => 'Pharmacy not found.'],
            404);
        }
        return response()->json([
            'message' => 'Pharmacy updated successfully.',
            'pharmacy' => new PharmacyResource($pharmacy),
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->pharmacyService->deletePharmacy($id);
        return response()->json(['message' => 'Pharmacy deleted successfully.']);
    }
}
