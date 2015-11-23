<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Laravel\Socialite\Contracts\Factory as Socialite;
use Auth;

class AuthController extends Controller
{
    protected $loginPath = 'admin/login';
    protected $redirectPath = 'admin';
    protected $redirectAfterLogout = 'admin/login';

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $socialite;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(Socialite $socialite) {
        $this->socialite = $socialite;
        $this->middleware('guest', ['except' => 'getLogout']);
    }


    public function getSocialAuth($provider=null)
    {
        if(!config("services.$provider")) abort('404'); //just to handle providers that doesn't exist
        // dd($provider);

        return $this->socialite->with($provider)->redirect();
    }


    public function getSocialAuthCallback($provider=null)
    {
        if($user = $this->socialite->with($provider)->user())
            dd($user->nickname);
        else
            return 'something went wrong';
    }

    /**
     * @return \Illuminate\View\View
     */
    public function getLogin()
    {
        return view('_backend.auth.login');
    }

    /**
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|string
     */
    public function postLogin()
    {
        $email  = request()->get('email');
        $pass   = request()->get('password');

        if(Auth::attempt(['email' => $email, 'password' => $pass], request()->get('remember') ? true : false))
        {
            $user = Auth::user();

            if( $user->status == 1 )
            {
                alert()->success('Bine ai revenit, ' . $user->name . '!', 'Succes!');
                return redirect()->route('dashboard');
            }

            Auth::logout();
            alert()->info('Contul tau a fost dezactivat!', 'Ne pare rau!');
            return redirect()->route('login');
        } 

        alert()->error('Datele tale nu sunt corecte!', 'Eroare!');
        return redirect()->route('login');
    }

}
