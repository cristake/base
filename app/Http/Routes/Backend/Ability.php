<?php

	get('settings/abilities', 'AbilityController@index')->name('abilities');

	get('settings/abilities/create', 'AbilityController@create')->name('abilities_create');
	post('settings/abilities/store', 'AbilityController@store')->name('abilities_store');

	get('settings/abilities/{id}/edit', 'AbilityController@edit')->name('abilities_edit');
	put('settings/abilities/{id}/update', 'AbilityController@update')->name('abilities_update');

	get('settings/abilities/{id}/destroy', 'AbilityController@destroy')->name('abilities_destroy');
	get('settings/abilities/{id}/restore', 'AbilityController@restore')->name('abilities_restore');
	get('settings/abilities/{id}/forceDelete', 'AbilityController@forceDelete')->name('abilities_forceDelete');
