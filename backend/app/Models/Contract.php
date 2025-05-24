<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Contract extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'monthly_salary',
        'shift_id',
        'pharmacy_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'monthly_salary' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }

    public function scopeActive($query)
    {
        return $query->where('start_date', '<=', now())
                     ->where('end_date', '>=', now());
    }

    public function scopeExpired($query)
    {
        return $query->where('end_date', '<', now());
    }

    public function scopeFuture($query)
    {
        return $query->where('start_date', '>', now());
    }

    public function scopeEndingSoon($query, $days = 30)
    {
        return $query->where('end_date', '>=', now())
                     ->where('end_date', '<=', now()->addDays($days));
    }

    public function isActive(): bool
    {
        $now = now();
        return $this->start_date <= $now && $this->end_date >= $now;
    }

    public function isExpired(): bool
    {
        return $this->end_date < now();
    }

    public function isFuture(): bool
    {
        return $this->start_date > now();
    }
    public function getDurationInDays(): int
    {
        return $this->start_date->diffInDays($this->end_date) + 1;
    }

    public function getDurationInMonths(): int
    {
        return $this->start_date->diffInMonths($this->end_date);
    }

    public function getRemainingDays(): int
    {
        if ($this->isExpired()) {
            return 0;
        }

        $startDate = $this->isFuture() ? $this->start_date : now();
        return $startDate->diffInDays($this->end_date) + 1;
    }
}
