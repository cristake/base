<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Auth;

class AuthController extends Controller
{
    protected $loginPath = 'admin/login';
    // protected $redirectPath = 'admin';
    // protected $redirectAfterLogout = 'admin/login';

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
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
