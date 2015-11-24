<?php

	get('users', 'UserController@index')->name('users');

	get('users/create', 'UserController@create')->name('users_create');
	post('users/store', 'UserController@store')->name('users_store');

	get('users/{id}', 'UserController@show')->name('users_show');

	get('users/{id}/edit', 'UserController@edit')->name('users_edit');
	put('users/{id}/update', 'UserController@update')->name('users_update');

	get('users/{id}/destroy', 'UserController@destroy')->name('users_destroy');

	get('users/{id}/mark/{status}', 'UserController@mark')->name('mark_users');