<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'section_id' => $this->faker->randomElement([1,2,3,4,5,6,7,8,9,10]),
            'title' => $this->faker->title(),
            'content'=> $this->faker->realText(),
            'position' => $this->faker->randomElement([1,2,3,4,5,6,7,8,9,10]),
        ];
    }
}
