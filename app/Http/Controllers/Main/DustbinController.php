<?php
namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DustbinController extends Controller
{
    public function index()
    {
        $dustbins = Auth::user()->dustbins->map(function ($dustbin) {
            return [
                'id'                    => $dustbin->id,
                'name'                  => $dustbin->name,
                'isActive'              => $dustbin->is_active,
                'token'                 => $dustbin->token,
                'tokenExpire'           => $dustbin->token_expire,
                'onlineStatus'          => $dustbin->online_status,
                'lastOnline'            => $dustbin->last_online,
                'lastIp'                => $dustbin->last_ip,
                'fillLevel'             => $dustbin->fill_level,
                'smsNotification'       => $dustbin->sms_notification,
                'notificationThreshold' => $dustbin->notification_threshold,
            ];
        });

        return Inertia::render('main/dustbin/index', [
            'dustbins' => $dustbins,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Log::info('Dustbin updated', [$request->all()]);

        $dustbin = Auth::user()->dustbins()->find($id);
        $dustbin->update(
            [
                'name'                   => $request->input('name'),
                'is_active'              => $request->input('isActive'),
                'sms_notification'       => $request->input('smsNotification'),
                'notification_threshold' => $request->input('notificationThreshold'),
                'token_expire'           => $request->input('tokenExpire'),
                'token'                  => $request->input('token'),
            ]
        );

        return Redirect::back()->with('success', 'Dustbin updated successfully');

    }

    public function store(Request $request)
    {
        $dustbin = Auth::user()->dustbins()->create(
            [
                'name'                   => $request->input('name'),
                'is_active'              => $request->input('isActive'),
                'sms_notification'       => $request->input('smsNotification'),
                'notification_threshold' => $request->input('notificationThreshold'),
                'token_expire'           => $request->input('tokenExpire'),
                'token'                  => $request->input('token'),
            ]
        );

        return redirect()->back()->with('success', 'Dustbin created successfully');
    }

    public function delete($id)
    {
        $dustbin = Auth::user()->dustbins()->find($id);
        $dustbin->delete();

        return redirect()->back()->with('success', 'Dustbin deleted successfully');
    }
}
