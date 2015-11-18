<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class JWTServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        app('Dingo\Api\Auth\Auth')->extend('jwt', function ($app) {
            return new Dingo\Api\Auth\Provider\JWT($app['Tymon\JWTAuth\JWTAuth']);
        });
    }
}
