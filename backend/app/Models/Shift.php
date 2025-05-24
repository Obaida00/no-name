<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Shift extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'start',
        'end',
        'days_of_week',
    ];

    protected function casts(): array
    {
        return [
            'start' => 'datetime:H:i',
            'end' => 'datetime:H:i',
            'days_of_week' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    public function scopeByDays($query, array $days)
    {
        return $query->where(function ($q) use ($days) {
            foreach ($days as $day) {
                $q->orWhereJsonContains('days_of_week', $day);
            }
        });
    }

    public function includesDay(string $day): bool
    {
        return in_array(strtolower($day), array_map('strtolower', $this->days_of_week ?? []));
    }
}
