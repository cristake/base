<?php

	get('content/pages', 'PageController@index')->name('pages');

	get('content/pages/create', 'PageController@create')->name('pages_create');
	post('content/pages/store', 'PageController@store')->name('pages_store');

	get('content/pages/{id}', 'PageController@show')->name('pages_show');

	get('content/pages/{id}/edit', 'PageController@edit')->name('pages_edit');
	put('content/pages/{id}/update', 'PageController@update')->name('pages_update');

	get('content/pages/{id}/destroy', 'PageController@destroy')->name('pages_destroy');
	get('content/pages/{id}/restore', 'PageController@restore')->name('pages_restore');
	get('content/pages/{id}/forceDelete', 'PageController@forceDelete')->name('pages_forceDelete');

	get('content/pages/{id}/mark/{status}', 'PageController@mark')->name('mark_pages');