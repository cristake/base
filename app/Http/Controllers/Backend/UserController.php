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
    public function store(CreateUserRequest $request)
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
        // return $this->api->get('api/users/' . $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);

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
        $this->api->put('api/users/'. $id, $request->all());

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
        $user = User::findOrFail($id);

        $this->api->delete('api/users/'. $id);

        alert()->success( sprintf('Utilizatorul %s a fost sters!', $user->name), 'Succes!' );
        return redirect()->route('users');
    }

    /**
     * Mark user as inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark(Request $request, $id, $status)
    {
        $this->api->get(sprintf('api/users/%d/mark/%d', $id, $status));

        $user = User::findOrFail($id);

        $message = ( sprintf("Utilizatorul %s a fost %s", $user->name, ($user->status == 1 ? "activat!" : "dezactivat!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }

}