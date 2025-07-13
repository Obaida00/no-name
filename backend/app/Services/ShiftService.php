<?php

namespace App\Services;

use App\Models\Shift;

class ShiftService
{
    public function getAllShifts(int $page = 1, int $perPage = 15, array $filters = [])
    {
        $query = Shift::query();

        if (isset($filters['days']) && !empty($filters['days'])) {
            $query->byDays($filters['days']);
        }

        if (isset($filters['start_time'])) {
            $query->where('start', '>=', $filters['start_time']);
        }

        if (isset($filters['end_time'])) {
            $query->where('end', '<=', $filters['end_time']);
        }

        return $query->paginate(perPage: $perPage, page: $page);
    }

    public function getShiftById(string $id)
    {
        return Shift::find($id);
    }

    public function createShift(array $data)
    {
        return Shift::create($data);
    }

    public function updateShift(string $id, array $data)
    {
        $shift = $this->getShiftById($id);

        if (!$shift) {
            return null;
        }

        $shift->update($data);
        return $shift;
    }

    public function deleteShift(string $id)
    {
        $shift = $this->getShiftById($id);

        if (!$shift) {
            return false;
        }

        if ($shift->contracts()->exists()) {
            return false;
        }

        return $shift->delete();
    }

    public function getShiftsByDays(array $days, int $page = 1, int $perPage = 15)
    {
        return Shift::byDays($days)->paginate(perPage: $perPage, page: $page);
    }

    public function getAvailableShifts(int $page = 1, int $perPage = 15)
    {
        $query = Shift::whereDoesntHave('contracts', function ($q) {
            $q->active();
        });

        return $query->paginate(perPage: $perPage, page: $page);
    }
}
