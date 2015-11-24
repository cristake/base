<?php

namespace App\Http\Controllers\Backend\Auth;

use Illuminate\Contracts\Auth\Guard; 
use Laravel\Socialite\Contracts\Factory as Socialite; 
use Api\Repositories\UserRepository;
use Request; 

class AuthenticateUser
{     

    private $socialite;
    private $auth;
    private $users;

    public function __construct(Socialite $socialite, Guard $auth, UserRepository $users)
    {
        $this->socialite = $socialite;
        $this->users = $users;
        $this->auth = $auth;
    }

    public function execute($request, $listener, $provider)
    {
        if (! $request)
            return $this->getAuthorizationFirst($provider);

        $user = $this->users
            ->findByUserNameOrCreate( $this->getSocialUser($provider), $provider );

        if( $user->status )
        {
            $this->auth->login($user, true);

            return $listener->userHasLoggedIn($user);
        }

        alert()->error('Contul tau a fost dezactivat!', 'Eroare!');
        return redirect()->back();
    }


    private function getAuthorizationFirst($provider)
    { 
        return $this->socialite
            ->driver($provider)
            ->redirect();
    }


    private function getSocialUser($provider)
    {
        return $this->socialite
            ->driver($provider)
            ->user();
    }
}