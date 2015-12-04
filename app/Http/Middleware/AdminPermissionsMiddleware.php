<?php

namespace App\Http\Middleware;

use Closure;

class AdminPermissionsMiddleware
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
        if( $request->user()->isAdmin() )
            return $next($request);

        // Abort, unauthorized action.
        // return abort(403);
        // alert()->warning('Accesul tau este restrictionat in aceasta sectiune', 'Info!');
        return redirect()->route('dashboard');
    }
}
