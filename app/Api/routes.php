<?php

/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
*/
$api = app('api.router');

$api->version('v1', function ($api)
{
	$api->group(['namespace' => 'Api\Controllers'], function ($api)
	{
		$api->post('authenticate', 'AuthenticateController@authenticate');
		// $api->get('users/me', 'UserController@getAuthenticatedUser');

		$api->resource('users', 'UserController');
		$api->resource('roles', 'RoleController');
		$api->resource('abilities', 'AbilityController');
	});
});