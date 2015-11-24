<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, Mandrill, and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => '',
        'secret' => '',
    ],

    'mandrill' => [
        'secret' => '',
    ],

    'ses' => [
        'key'    => '',
        'secret' => '',
        'region' => 'us-east-1',
    ],

    'stripe' => [
        'model'  => App\Models\User::class,
        'key'    => '',
        'secret' => '',
    ],

    // Socialite
    'facebook' => [
        'client_id'     => '1649219542034094',
        'client_secret' => 'b912174226c5629ddf9747f5368de2f1',
        'redirect'      => 'http://base.dev/admin/login/callback/facebook',
    ],

    // Socialite
    'twitter' => [
        'client_id'     => 'nFTXFzU8yKNPBfdB8xSLJwMIc',
        'client_secret' => 'pa4V6eNWvMQctniUtG3vb7lR3rtcy1EmX8HNO53nink0VVELce',
        'redirect'      => 'http://base.dev/admin/login/callback/twitter',
    ],

];
