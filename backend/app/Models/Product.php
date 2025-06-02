<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Product extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'name',
        'active_ingredient',
        'description',
        'shape',
        'exp_date',
        'category_id',
        'quantity',
    ];

    protected function casts(): array
    {
        return [
            'exp_date' => 'date',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
            'quantity' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function scopeExpired($query)
    {
        return $query->where('exp_date', '<', now());
    }

    public function scopeExpiringSoon($query, $months = 3)
    {
        return $query->where('exp_date', '>=', now())
                     ->where('exp_date', '<=', now()->addMonths($months));
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeSearch($query, $term)
    {
        return $query->where(function ($query) use ($term) {
            $query->where('name', 'like', "%{$term}%")
                  ->orWhere('active_ingredient', 'like', "%{$term}%");
        });
    }
}
