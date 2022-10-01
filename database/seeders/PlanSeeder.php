<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = [
            [
                'name' => 'Basic', 
                'slug' => 'basic', 
                'stripe_plan' => 'price_1LkoE4F34wu37Nhc2Af5CUFx', 
                'price' => 5, 
                'description' => 'Basic'
            ],
            [
                'name' => 'Standard', 
                'slug' => 'standard', 
                'stripe_plan' => 'price_1LnNiIF34wu37NhcJYZPPJcS', 
                'price' => 10, 
                'description' => 'standard'
            ],
            [
                'name' => 'Premium', 
                'slug' => 'premium', 
                'stripe_plan' => 'price_1LkoAUF34wu37Nhc4bmqwPFJ', 
                'price' => 15, 
                'description' => 'Premium'
            ]
        ];
  
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
