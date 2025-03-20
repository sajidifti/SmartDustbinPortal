<?php
namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Dustbin;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $cards = [
            [
                'title' => 'Dustbins',
                'count' => Dustbin::count(),
            ],
            [
                'title' => 'Users',
                'count' => User::count(),
            ],
        ];

        return Inertia::render('dashboard', [
            'cards' => $cards
        ]);
    }
}
