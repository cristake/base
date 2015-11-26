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

		$api->resource('pages', 'PageController');
		$api->get('pages/{id}/mark/{status}', 'PageController@mark');
		$api->get('pages/{id}/restore', 'PageController@restore');
		$api->get('pages/{id}/forceDelete', 'PageController@forceDelete');

		$api->resource('sections', 'SectionController');
		// $api->get('sections/{id}/mark/{status}', 'SectionController@mark');
		// $api->get('sections/{id}/restore', 'SectionController@restore');
		// $api->get('sections/{id}/forceDelete', 'SectionController@forceDelete');

		$api->resource('users', 'UserController');
		$api->get('users/{id}/mark/{status}', 'UserController@mark');
		$api->get('users/{id}/restore', 'UserController@restore');
		$api->get('users/{id}/forceDelete', 'UserController@forceDelete');

		$api->resource('roles', 'RoleController');
		$api->resource('abilities', 'AbilityController');
	});
});