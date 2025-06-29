<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pharmacy extends Model
{
    protected $fillable =
        [
            'id',
            'name',
            'location',
            'owner_user_id'
        ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

}
