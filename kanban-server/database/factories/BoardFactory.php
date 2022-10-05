<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Board>
 */
class BoardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    private static $order = 1;
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomElement([1,2,3,4,5,6,7,8,9,10]),
            'icon' => $this->faker->emoji(),
            'title' => $this->faker->country(),
            'description' => $this->faker->realText(),
            'position' => self::$order++,
            'favourite' => $this->faker->boolean(),
            'favourite_position' => $this->faker->randomElement([1,2,3,4,5,6,]),
        ];
    }
}
