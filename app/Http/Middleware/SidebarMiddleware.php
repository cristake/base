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
            /*
            |--------------------------------------------------------------------------
            | DASHBOARD
            |--------------------------------------------------------------------------
            */
            $menu->add('Dashboard', ['route' => 'dashboard'])
                // ->prepend('<i class="fa fa-tachometer"></i>')
                ->prepend('<svg class="glyph stroked dashboard dial"><use xlink:href="#stroked-dashboard-dial"/></svg>')
                ->data('visible', true);

            /*
            |--------------------------------------------------------------------------
            | CONTENT
            |--------------------------------------------------------------------------
            */
            $menu->add('Continut', '#sub-menu-continut')
                ->prepend('<svg class="glyph stroked app window with content"><use xlink:href="#stroked-app-window-with-content"/></svg>')
                ->append('<span class="icon pull-right"><em class="fa fa-chevron-right"></em></span> ')
                ->data('visible', true);
                // DISPLAY ALL PAGES
                $menu->add('Pagini', ['route' => 'pages', 'parent' => $menu->continut->id])
                    ->active('admin/content/pages/*')
                    ->data('visible', true);

            /*
            |--------------------------------------------------------------------------
            | SETTINGS
            |--------------------------------------------------------------------------
            */
            if( Gate::check('view_settings') )
            {
                $menu->add('Setari', '#sub-menu-setari')
                ->prepend('<svg class="glyph stroked gear"><use xlink:href="#stroked-gear"/></svg>')
                ->append('<span class="icon pull-right"><em class="fa fa-chevron-right"></em></span> ')
                ->data('visible', true);
                // USERS
                if( Gate::check('view_users') )
                $menu->add('Utilizatori', ['route' => 'users', 'parent' => $menu->setari->id])
                     ->active('admin/settings/users/*')
                     ->data('visible', true);
                // ROLES
                if( Gate::check('view_roles') )
                $menu->add('Roluri', ['route' => 'roles', 'parent' => $menu->setari->id])
                     ->active('admin/settings/roles/*')
                     ->data('visible', true);
                // ABILITIES
                if( Gate::check('view_abilities') )
                $menu->add('Abilitati', ['route' => 'abilities', 'parent' => $menu->setari->id])
                     ->active('admin/settings/abilities/*')
                     ->data('visible', true);
            }
        });

        return $next($request);
    }
}
