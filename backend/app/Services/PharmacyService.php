<?php

namespace App\Services;

use App\Models\Pharmacy;
use Illuminate\Support\Facades\Auth;

class PharmacyService
{
    public function listUserPharmacies()
    {
        $user = Auth::user();

        if (!$user) {
            abort(401, 'Unauthorized');
        }

        /** @var \App\Models\User $user */
        return $user->pharmacies;
    }

    public function createPharmacy(array $data): Pharmacy
    {
        return Pharmacy::create([
            'name'     => $data['name'],
            'location' => $data['location'],
            'owner_user_id'  => Auth::id(),
        ]);
    }

    public function getPharmacyById(int $id): Pharmacy
    {
        return Pharmacy::findOrFail($id);
    }

    public function updatePharmacy(Pharmacy $pharmacy, array $data): Pharmacy
    {
        if ($pharmacy->owner_user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this pharmacy.');
        }

        $pharmacy->update($data);
        return $pharmacy;
    }

    public function deletePharmacy(Pharmacy $pharmacy): bool
    {
        if ($pharmacy->owner_user_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this pharmacy.');
        }

        return $pharmacy->delete();
    }

}
