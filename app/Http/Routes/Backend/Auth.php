<?php

	$router->group(['namespace' => 'Auth'], function () use ($router)
	{
		get('login', 'AuthController@getLogin')->name('backend_login');
		post('login', 'AuthController@postLogin')->name('backend_login');

		get('logout', 'AuthController@getLogout')->name('backend_logout');

		// Social Login
		get('login/{provider?}', 'AuthController@login')->name('login_provider');
		get('login/callback/{provider?}', 'AuthController@login');
	});