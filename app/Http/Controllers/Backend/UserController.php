<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUsersRequest;

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
		$users = $this->api->get('api/users');

		return view('_backend.users.index', compact('users'));
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
    public function store(CreateUsersRequest $request)
    {
    	$this->api->post('api/users', $request->all());

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
        // $user = User::findOrFail($id);

        // return view('backend.users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUsersRequest $request, $id)
    {
        // $user = User::findOrFail($id);
        // $user->update($request->all());

        // alert()->success("Utilizatorul '". $user->name ."' a fost editat!", 'Succes!');

        // if( Auth::user()->can('view_users') )
        //     return redirect()->route('users');
        // else
        //     return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // $user = User::findOrFail($id);
        // $user->destroy($id);

        // alert()->success("Utilizatorul '". $user->name ."' a fost sters!", 'Succes!');
        // return redirect()->route('users');
    }

    /**
     * Mark user as inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark(Request $request, $id, $status)
    {
        // $user = User::findOrFail($id);
        // $user->status = $status;
        // $user->update();

        // $message = ( "Utilizatorul '". $user->name ."' a fost " . ($user->status == 1 ? "activat!" : "dezactivat!") );
        // alert()->success($message, 'Succes!');

        // return redirect()->back();
    }

}