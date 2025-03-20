<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class SMSService
{
    public static function sendSms($phoneno, $messageBody)
    {
        if(env('SMS_URL')){
            $url = env('SMS_URL') . $phoneno . "&messageContent=" . urlencode($messageBody);
            return Self::smsApi($url);
        }
    }

    public static function smsApi($url)
    {
        //return $url;
        $ch = curl_init(); // Initialize cURL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}
