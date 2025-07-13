<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ShiftService;
use Illuminate\Http\Request;
use App\Http\Requests\Shift\CreateShiftRequest;
use App\Http\Requests\Shift\UpdateShiftRequest;
use App\Http\Resources\Shift\ShiftResource;
use App\Http\Resources\Shift\ShiftCollection;

class ShiftController extends Controller
{
    protected $shiftService;

    public function __construct(ShiftService $shiftService)
    {
        $this->shiftService = $shiftService;
    }

    public function index(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));
        $filters = [
            'days' => $request->query('days') ? explode('-', $request->query('days')) : null,
            'start_time' => $request->query('startTime'),
            'end_time' => $request->query('endTime'),
        ];

        $shifts = $this->shiftService->getAllShifts($page, $perPage, $filters);

        return (new ShiftCollection($shifts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function store(CreateShiftRequest $request)
    {
        $data = $request->validatedData();
        $shift = $this->shiftService->createShift($data);

        return (new ShiftResource($shift))
            ->additional([
                'message' => 'Shift created successfully'
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $id)
    {
        $shift = $this->shiftService->getShiftById($id);

        if (!$shift) {
            return response()->json([
                'message' => 'Shift not found'
            ], 404);
        }

        return new ShiftResource($shift);
    }

    public function update(UpdateShiftRequest $request, string $id)
    {
        $data = $request->validatedData();
        $shift = $this->shiftService->updateShift($id, $data);

        if (!$shift) {
            return response()->json([
                'message' => 'Shift not found'
            ], 404);
        }

        return (new ShiftResource($shift))
            ->additional([
                'message' => 'Shift updated successfully'
            ]);
    }

    public function destroy(string $id)
    {
        $result = $this->shiftService->deleteShift($id);

        if ($result === false) {
            return response()->json([
                'message' => 'Shift not found or cannot be deleted'
            ], 404);
        }

        return response()->json([
            'message' => 'Shift deleted successfully'
        ]);
    }

    public function getByDays(Request $request)
    {
        $request->validate([
            'days' => 'required|string',
        ]);

        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));
        $days = explode(',', $request->query('days'));

        $shifts = $this->shiftService->getShiftsByDays($days, $page, $perPage);

        return (new ShiftCollection($shifts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }

    public function getAvailable(Request $request)
    {
        $page = intval($request->query('page', 1));
        $perPage = intval($request->query('perPage', 15));

        $shifts = $this->shiftService->getAvailableShifts($page, $perPage);

        return (new ShiftCollection($shifts))
            ->additional([
                'page' => $page,
                'perPage' => $perPage,
            ]);
    }
}
