<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		return view('_backend.users.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('_backend.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        alert()->success(sprintf("Utilizatorul %s a fost creat!", $request->get('name')), 'Succes!');
        return redirect()->route('users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('_backend.users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        alert()->success(sprintf("Utilizatorul %s a fost editat!", $request->get('name')), 'Succes!');
        return redirect()->route('users');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        alert()->success( sprintf('Utilizatorul %s a fost sters!', $user->name), 'Succes!' );
        return redirect()->route('users');
    }

    /**
     * Restore the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        alert()->success( 'Utilizatorul a fost restaurat!', 'Success' );
        return redirect()->route('users');
    }

    /**
     * Permanently remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($id)
    {
        alert()->success( sprintf('Utilizatorul %s a fost sters definitiv!', $user->name), 'Succes!' );
        return redirect()->route('users');
    }

    /**
     * Mark resource as active / inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark($id, $status)
    {
        $message = ( sprintf("Utilizatorul %s a fost %s", $user->name, ($status == 1 ? "activat!" : "dezactivat!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }

}