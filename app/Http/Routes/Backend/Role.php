<?php

	get('settings/roles', 'RoleController@index')->name('roles');

	get('settings/roles/create', 'RoleController@create')->name('roles_create');
	post('settings/roles/store', 'RoleController@store')->name('roles_store');

	get('settings/roles/{id}/edit', 'RoleController@edit')->name('roles_edit');
	put('settings/roles/{id}/update', 'RoleController@update')->name('roles_update');

	get('settings/roles/{id}/destroy', 'RoleController@destroy')->name('roles_destroy');
	get('settings/roles/{id}/restore', 'RoleController@restore')->name('roles_restore');
	get('settings/roles/{id}/forceDelete', 'RoleController@forceDelete')->name('roles_forceDelete');
