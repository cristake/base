<?php

	get('/', 'HomeController@index');
	get('{page}/{subpage}', 'HomeController@page');
