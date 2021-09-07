<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Item;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Item::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->sentence(5),
        'price' => $faker->numberBetween($min = 100, $max = 10000),
        'photo_url' => $faker->imageUrl($width = 200, $height = 200),
        'ends_at' => $faker->dateTimeBetween('now', '+15 days'),
    ];
});
