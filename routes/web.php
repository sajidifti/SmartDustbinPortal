<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Main\DustbinController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dustbins', [DustbinController::class, 'index'])->name('dustbins.index');

    Route::put('dustbins/{id}', [DustbinController::class, 'update'])->name('dustbins.update');

    Route::post('dustbins', [DustbinController::class, 'store'])->name('dustbins.store');

    Route::delete('dustbins/{id}', [DustbinController::class, 'delete'])->name('dustbins.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
