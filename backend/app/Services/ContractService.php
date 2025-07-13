<?php

namespace App\Services;

use App\Models\Contract;
use Carbon\Carbon;

class ContractService
{
    public function getAllContracts(int $page = 1, int $perPage = 15, array $filters = [])
    {
        $query = Contract::with(['user', 'shift']);

        if (isset($filters['search']) && !empty($filters['search'])) {
            $query->whereHas('user', function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                    ->orWhere('email', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (isset($filters['shift_id'])) {
            $query->where('shift_id', $filters['shift_id']);
        }

        if (isset($filters['status'])) {
            switch ($filters['status']) {
                case 'active':
                    $query->active();
                    break;
                case 'expired':
                    $query->expired();
                    break;
                case 'future':
                    $query->future();
                    break;
                case 'ending_soon':
                    $days = $filters['ending_soon_days'] ?? 30;
                    $query->endingSoon($days);
                    break;
            }
        }

        if (isset($filters['start_date_from'])) {
            $query->where('start_date', '>=', $filters['start_date_from']);
        }

        if (isset($filters['start_date_to'])) {
            $query->where('start_date', '<=', $filters['start_date_to']);
        }

        if (isset($filters['end_date_from'])) {
            $query->where('end_date', '>=', $filters['end_date_from']);
        }

        if (isset($filters['end_date_to'])) {
            $query->where('end_date', '<=', $filters['end_date_to']);
        }

        if (isset($filters['salary_min'])) {
            $query->where('monthly_salary', '>=', $filters['salary_min']);
        }

        if (isset($filters['salary_max'])) {
            $query->where('monthly_salary', '<=', $filters['salary_max']);
        }

        return $query->paginate(perPage: $perPage, page: $page);
    }

    public function getContractById(string $id)
    {
        return Contract::with(['user', 'shift'])->find($id);
    }

    public function createContract(array $data)
    {
        return Contract::create($data);
    }

    public function updateContract(string $id, array $data)
    {
        $contract = $this->getContractById($id);

        if (!$contract) {
            return null;
        }

        $contract->update($data);
        return $contract->fresh(['user', 'shift']);
    }

    public function deleteContract(string $id)
    {
        $contract = $this->getContractById($id);

        if (!$contract) {
            return false;
        }

        return $contract->delete();
    }

    public function endContract(string $id, ?string $endDate = null)
    {
        $contract = $this->getContractById($id);

        if (!$contract) {
            return null;
        }

        $newEndDate = $endDate ? Carbon::parse($endDate) : now()->toDateString();

        if (Carbon::parse($newEndDate)->lt($contract->start_date)) {
            return false;
        }

        $contract->update(['end_date' => $newEndDate]);
        return $contract->fresh(['user', 'shift']);
    }

    public function renewContract(string $id, array $renewalData)
    {
        $contract = $this->getContractById($id);

        if (!$contract) {
            return null;
        }

        $newStartDate = Carbon::parse($contract->end_date)->addDay();

        $newContractData = [
            'user_id' => $contract->user_id,
            'start_date' => $newStartDate->toDateString(),
            'end_date' => $renewalData['end_date'],
            'monthly_salary' => $renewalData['monthly_salary'] ?? $contract->monthly_salary,
            'shift_id' => $renewalData['shift_id'] ?? $contract->shift_id,
            'pharmacy_id' => $renewalData['pharmacy_id'] ?? $contract->pharmacy_id,
        ];

        return Contract::create($newContractData);
    }

    public function getUserContracts(string $userId, int $page = 1, int $perPage = 15, array $filters = [])
    {
        $filters['user_id'] = $userId;
        return $this->getAllContracts($page, $perPage, $filters);
    }

    public function getActiveContracts(int $page = 1, int $perPage = 15)
    {
        return Contract::with(['user', 'shift'])
            ->active()
            ->paginate(perPage: $perPage, page: $page);
    }

    public function getExpiredContracts(int $page = 1, int $perPage = 15)
    {
        return Contract::with(['user', 'shift'])
            ->expired()
            ->paginate(perPage: $perPage, page: $page);
    }

    public function getContractsEndingSoon(int $days = 30, int $page = 1, int $perPage = 15)
    {
        return Contract::with(['user', 'shift'])
            ->endingSoon($days)
            ->paginate(perPage: $perPage, page: $page);
    }
}
