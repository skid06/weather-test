<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    public function subscribe(Request $request)
    {
        try {
            $payment = $request->user()->newSubscription(
                $request->plan['name'], 
                $request->plan['stripe_plan']
            )->create($request->payment_method);
        } catch (\Exception $exception) {
            abort(404, $exception);
        }

        return response()->json($payment);
    }

    public function plans()
    {
        return Plan::all();
    }
}
