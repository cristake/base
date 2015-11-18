<?php

/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
*/
$api = app('Dingo\Api\Routing\Router');

$api->group(['version' => 'v1'], function($api)
{
	$api->get('authenticate', 'Api\Controllers\AuthenticateController@index');
	$api->post('authenticate', 'Api\Controllers\AuthenticateController@authenticate');
	$api->get('authenticate/user', 'Api\Controllers\AuthenticateController@getAuthenticatedUser');
});
