<?php
namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DustbinController extends Controller
{
    public function index()
    {
        $dustbins = Auth::user()->dustbins;

        return Inertia::render('main/dustbin/index', [
            'dustbins' => $dustbins,
        ]);
    }
}
