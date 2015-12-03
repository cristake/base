<?php

	get('settings/users', 'UserController@index')->name('users');

	get('settings/users/create', 'UserController@create')->name('users_create');
	post('settings/users/store', 'UserController@store')->name('users_store');

	get('settings/users/{id}', 'UserController@show')->name('users_show');

	get('settings/users/{id}/edit', 'UserController@edit')->name('users_edit');
	put('settings/users/{id}/update', 'UserController@update')->name('users_update');

	get('settings/users/{id}/destroy', 'UserController@destroy')->name('users_destroy');
	get('settings/users/{id}/restore', 'UserController@restore')->name('users_restore');
	get('settings/users/{id}/forceDelete', 'UserController@forceDelete')->name('users_forceDelete');

	get('settings/users/{id}/mark/{status}', 'UserController@mark')->name('mark_users');