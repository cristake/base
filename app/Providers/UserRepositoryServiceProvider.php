<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Repositories\UserRepository;
use App\Models\User;

class UserRepositoryServiceProvider extends ServiceProvider
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
        $this->app->bind('App\Http\Repositories\UserRepositoryInterface', 'App\Http\Repositories\UserRepository');
    }
}
