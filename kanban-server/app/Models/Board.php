<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Board
 *
 * @property int $id
 * @property int $user_id
 * @property string $icon
 * @property string $title
 * @property string $description
 * @property int $position
 * @property int $favourite
 * @property int $favourite_position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\BoardFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Board newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Board newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Board query()
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereFavourite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereFavouritePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Board whereUserId($value)
 * @mixin \Eloquent
 */
class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'icon',
        'title',
        'description',
        'position',
        'favourite',
        'favourite_position',
        'created_at',
        'updated_at'

    ];

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

    public function tasks()
    {
        return $this->hasManyThrough(Task::class, Section::class, 'board_id', 'section_id', 'id');
    }
}
