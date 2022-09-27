<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/profile', function () {
    return Inertia::render('Profile',[
        'intent' => auth()->user()->createSetupIntent()
    ]);
})->middleware(['auth', 'verified'])->name('profile');

Route::get('/weather', function () {
    return Inertia::render('Weather', [
        'ip' => request()->ip(),
        'subscription' => 0,// auth()->user()->subscription,
    ]);
})->middleware(['auth', 'verified'])->name('weather');

Route::get('/full-forecasts', function () {
    return Inertia::render('FullForecasts', [
        'ip' => request()->ip(),
        'subscription' => 1,// auth()->user()->subscription,
        'details' => request()->details,
    ]);
})->middleware(['auth', 'verified'])->name('full-forecasts');

require __DIR__.'/auth.php';
