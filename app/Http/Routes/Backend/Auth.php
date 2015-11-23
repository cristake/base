<?php

	$router->group(['namespace' => 'Auth'], function () use ($router)
	{
		get('login', 'AuthController@getLogin')->name('backend_login');
		post('login', 'AuthController@postLogin')->name('backend_login');

		// get('login/{provider?}', 'Auth\AuthController@login');
		//Social Login
		get('login/{provider?}', 'AuthController@getSocialAuth')->name('login_provider');
		get('login/callback/{provider?}', 'AuthController@getSocialAuthCallback');

		get('logout', 'AuthController@getLogout')->name('backend_logout');
	});