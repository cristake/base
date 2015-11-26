<?php

	get('content/pages/{page_id}/sections', 'SectionController@index')->name('sections');

	get('content/pages/{page_id}/sections/create', 'SectionController@create')->name('sections_create');
	post('content/pages/{page_id}/sections/store', 'SectionController@store')->name('sections_store');

	get('content/pages/{page_id}/sections/{section_id}', 'SectionController@show')->name('sections_show');

	get('content/pages/{page_id}/sections/{section_id}/edit', 'SectionController@edit')->name('sections_edit');
	put('content/pages/{page_id}/sections/{section_id}/update', 'SectionController@update')->name('sections_update');

	get('content/pages/{page_id}/sections/{section_id}/destroy', 'SectionController@destroy')->name('sections_destroy');
	get('content/pages/{page_id}/sections/{section_id}/restore', 'SectionController@restore')->name('sections_restore');
	get('content/pages/{page_id}/sections/{section_id}/forceDelete', 'SectionController@forceDelete')->name('sections_forceDelete');

	get('content/pages/{page_id}/sections/{section_id}/mark/{status}', 'SectionController@mark')->name('mark_sections');