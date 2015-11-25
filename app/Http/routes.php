<?php

/*
|--------------------------------------------------------------------------
| Application Backend Routes
|--------------------------------------------------------------------------
*/
$router->group(['namespace' => 'Backend'], function () use ($router)
{
	$router->group(['prefix' => 'admin'], function () use ($router)
	{
		require(__DIR__ . "/Routes/Backend/Auth.php");

		$router->group(['middleware' => ['auth', 'menu']], function () use ($router)
		{
			require(__DIR__ . "/Routes/Backend/Dashboard.php");
			require(__DIR__ . "/Routes/Backend/Page.php");
			require(__DIR__ . "/Routes/Backend/User.php");
		});
	});
});


/*
|--------------------------------------------------------------------------
| Application Frontend Routes
|--------------------------------------------------------------------------
*/
$router->group(['namespace' => 'Frontend'], function () use ($router)
{
	require(__DIR__ . "/Routes/Frontend/Home.php");
});