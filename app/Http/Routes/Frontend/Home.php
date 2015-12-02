<?php

	get('/', 'HomeController@index');
	get('{main_page}/{secondary_page?}', 'AboutUsController@index');
