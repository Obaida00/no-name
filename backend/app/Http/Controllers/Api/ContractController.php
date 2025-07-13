<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ContractService;
use Illuminate\Http\Request;
use App\Http\Requests\Contract\CreateContractRequest;
use App\Http\Requests\Contract\UpdateContractRequest;
use App\Http\Requests\Contract\EndContractRequest;
use App\Http\Requests\Contract\RenewContractRequest;
use App\Http\Resources\Contract\ContractResource;
use App\Http\Resources\Contract\ContractCollection;

class ContractController extends Controller
{
    protected $contractService;

    public function __construct(ContractService $contractService)
    {
        $this->contractService = $contractService;
    }

    public function index(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));
        $filters = [
            'search' => $request->query('search'),
            'user_id' => $request->query('userId'),
            'shift_id' => $request->query('shiftId'),
            'status' => $request->query('status'),
            'start_date_from' => $request->query('startDateFrom'),
            'start_date_to' => $request->query('startDateTo'),
            'end_date_from' => $request->query('endDateFrom'),
            'end_date_to' => $request->query('endDateTo'),
            'salary_min' => $request->query('salaryMin'),
            'salary_max' => $request->query('salaryMax'),
            'ending_soon_days' => intval($request->query('endingSoonDays', 30)),
        ];

        $contracts = $this->contractService->getAllContracts($page, $perPage, $filters);

        return (new ContractCollection($contracts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function store(CreateContractRequest $request)
    {
        $data = $request->validatedData();
        $contract = $this->contractService->createContract($data);

        return (new ContractResource($contract->load(['user', 'shift'])))
            ->additional([
                'message' => 'Contract created successfully'
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $id)
    {
        $contract = $this->contractService->getContractById($id);

        if (!$contract) {
            return response()->json([
                'message' => 'Contract not found'
            ], 404);
        }

        return new ContractResource($contract);
    }

    public function update(UpdateContractRequest $request, string $id)
    {
        $data = $request->validatedData();
        $contract = $this->contractService->updateContract($id, $data);

        if (!$contract) {
            return response()->json([
                'message' => 'Contract not found'
            ], 404);
        }

        return (new ContractResource($contract))
            ->additional([
                'message' => 'Contract updated successfully'
            ]);
    }

    public function destroy(string $id)
    {
        $result = $this->contractService->deleteContract($id);

        if ($result === false) {
            return response()->json([
                'message' => 'Contract not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Contract deleted successfully'
        ]);
    }

    public function end(EndContractRequest $request, string $id)
    {
        $data = $request->validatedData();
        $contract = $this->contractService->endContract($id, $data['end_date'] ?? null);

        if ($contract === null) {
            return response()->json([
                'message' => 'Contract not found'
            ], 404);
        }

        if ($contract === false) {
            return response()->json([
                'message' => 'Cannot end contract with a date before the start date'
            ], 422);
        }

        return (new ContractResource($contract))
            ->additional([
                'message' => 'Contract ended successfully'
            ]);
    }

    public function renew(RenewContractRequest $request, string $id)
    {
        $data = $request->validatedData();
        $newContract = $this->contractService->renewContract($id, $data);

        if (!$newContract) {
            return response()->json([
                'message' => 'Contract not found'
            ], 404);
        }

        return (new ContractResource($newContract->load(['user', 'shift'])))
            ->additional([
                'message' => 'Contract renewed successfully'
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function getUserContracts(Request $request, string $userId)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));
        $filters = [
            'status' => $request->query('status'),
            'start_date_from' => $request->query('startDateFrom'),
            'start_date_to' => $request->query('startDateTo'),
            'end_date_from' => $request->query('endDateFrom'),
            'end_date_to' => $request->query('endDateTo'),
        ];

        $contracts = $this->contractService->getUserContracts($userId, $page, $perPage, $filters);

        return (new ContractCollection($contracts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function getActive(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));

        $contracts = $this->contractService->getActiveContracts($page, $perPage);

        return (new ContractCollection($contracts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function getExpired(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));

        $contracts = $this->contractService->getExpiredContracts($page, $perPage);

        return (new ContractCollection($contracts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function getEndingSoon(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));
        $days = intval($request->query('days', 30));

        $contracts = $this->contractService->getContractsEndingSoon($days, $page, $perPage);

        return (new ContractCollection($contracts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }
}
