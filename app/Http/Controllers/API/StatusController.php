<?php
namespace App\Http\Controllers\API;

use App\Models\Dustbin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class StatusController extends Controller
{
    public function __invoke(Request $request)
    {
        if (! $request->has('token') || ! $request->has('trash_level')) {
            return response()->json(['status' => 'error'], 400);
        }

        $token       = $request->input('token');
        $trash_level = $request->input('trash_level');

        $dustbin = Dustbin::where('token', $token)->first();

        if (! $dustbin) {
            return response()->json(['status' => 'error'], 400);
        }

        $dustbin->fill_level = $trash_level;
        $dustbin->last_online = now();
        $dustbin->online_status = 1;
        $dustbin->last_ip = $request->ip();
        $dustbin->save();

        // Log::info('Dustbin ' . $dustbin->id . ' updated:' . 'Trash level: ' . $dustbin->fill_level . '%');

        return response()->json(['status' => 'ok'], 200);
    }
}
