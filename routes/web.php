<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Redirect::route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/payment', function () {
    return Inertia::render('Payment',[
        'intent' => auth()->user()->createSetupIntent()
    ]);
})->middleware(['auth', 'verified'])->name('payment');

Route::get('/weather', function () {
    return Inertia::render('Weather', [
        'ip' => request()->ip(),
        'accuweather_key' => env('ACCUWEATHER_KEY'),
        'subscription' => auth()->user()->subscribed('Basic') ? 1 : (
            auth()->user()->subscribed('Standard') ? 2 : (
                auth()->user()->subscribed('Premium') ? 3 : 0
            )
        ),
    ]);
})->middleware(['auth', 'verified'])->name('weather');

Route::get('/full-forecasts', function () {
    return Inertia::render('FullForecasts', [
        'details' => request()->details,
    ]);
})->middleware(['auth', 'verified'])->name('full-forecasts');

Route::middleware('auth:sanctum')->get('/plans', [PlanController::class, 'plans']);
Route::post('/subscribe', [PlanController::class, 'subscribe'])->middleware(['auth', 'verified'])->name('subscribe');

require __DIR__.'/auth.php';
