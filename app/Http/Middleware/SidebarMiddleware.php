<?php

namespace App\Http\Middleware;

use Closure, Sidebar, Gate;

class SidebarMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Sidebar::make('sidebar', function($menu)
        {
            // DASHBOARD
            $menu->add('Dashboard', ['route' => 'dashboard'])
                // ->prepend('<i class="fa fa-tachometer"></i>')
                ->prepend('<svg class="glyph stroked dashboard dial"><use xlink:href="#stroked-dashboard-dial"/></svg>')
                ->data('visible', true);

            /*
             * DISPLAY ALL USERS
             */
            // if( Gate::check('view_users') )
            // {
                $menu->add('Utilizatori', ['route' => 'users'])
                    ->prepend('<svg class="glyph stroked male user "><use xlink:href="#stroked-male-user"/></svg>')
                    // ->prepend('<i class="fa fa-users"></i>')
                    ->active('admin/users/*')
                    ->data('visible', true);

                    // // DISPLAY OUR TEAM MEMBERS
                    // $menu->add('Roluri', ['route' => 'users', 'parent' => $menu->utilizatori->id])
                    //     ->active('admin/users/roles/*')
                    //     ->data('visible', true);
            // }

        });

        return $next($request);
    }
}
