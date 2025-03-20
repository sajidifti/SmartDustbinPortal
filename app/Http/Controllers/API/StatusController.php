<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dustbin;
use App\Services\SMSService;
use Illuminate\Http\Request;
use Log;

class StatusController extends Controller
{
    public function __invoke(Request $request)
    {
        if (! $request->has('token') || ! $request->has('trash_level')) {
            return response()->json(['status' => 'error'], 400);
        }

        $token       = $request->input('token');
        $trash_level = $request->input('trash_level');

        $dustbin = Dustbin::where('token', $token)->with('user')->first();

        if (! $dustbin || $dustbin->is_active == 0 || $dustbin->token_expire < now()) {
            return response()->json(['status' => 'error'], 400);
        }

        $dustbin->fill_level    = $trash_level;
        $dustbin->last_online   = now();
        $dustbin->online_status = 1;
        $dustbin->last_ip       = $request->ip();
        $dustbin->save();

        if (($dustbin->fill_level >= $dustbin->notification_threshold) && $dustbin->sms_notification == 1 && $dustbin->user?->phone) {
            Log::info('Sending SMS notification for dustbin ' . $dustbin->id);
            SMSService::sendSms($dustbin->user?->phone, "Trash level of " . $dustbin->name . " is " . $dustbin->fill_level . "Percent. Please empty the dustbin.");
        }

        // Log::info('Dustbin ' . $dustbin->id . ' updated:' . 'Trash level: ' . $dustbin->fill_level . '%');

        return response()->json(['status' => 'ok'], 200);
    }
}
