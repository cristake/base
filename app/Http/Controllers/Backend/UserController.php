<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Repositories\UserRepositoryInterface;
use JavaScript;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    protected $repo;

    public function __construct(UserRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
        JavaScript::put([
            'users' => $this->repo->getAllWithTrashed()
        ]);

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
        $this->repo->create($request->except('_token'));

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
        $user = $this->repo->find($id);

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
        $this->repo->update($id, $request->except('_token'));

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
        $user = $this->repo->find($id);

        $user->status = 0;
        $user->update();

        $user->delete($id);

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
        $user = $this->repo
            ->findWithTrashed($id);

        $user->restore();

        $user->status = 1;
        $user->update();

        alert()->success( sprintf('Utilizatorul %s a fost restaurat!', $user->name), 'Success' );
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
        $user = $this->repo
            ->findWithTrashed($id);

        $user->forceDelete($id);

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
        $user = $this->repo
            ->find($id);

        $this->repo
            ->update($id, compact('status'));

        $message = ( sprintf("Utilizatorul %s a fost %s", $user->name, ($status == 1 ? "activat!" : "dezactivat!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }

}