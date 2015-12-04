<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\UserRepositoryInterface;
use App\Repositories\RoleRepositoryInterface;
use JavaScript;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepo;

    /**
     * @var RoleRepositoryInterface
     */
    protected $roleRepo;

    /**
     * Inject the interface
     * @param UserRepositoryInterface $userRepo 
     * @param RoleRepositoryInterface $roleRepo 
     */
    public function __construct(
        UserRepositoryInterface $userRepo,
        RoleRepositoryInterface $roleRepo
    )
    {
        $this->userRepo = $userRepo;
        $this->roleRepo = $roleRepo;

        parent::__construct();
    }

	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
        JavaScript::put([
            'users' => $this->userRepo->getAllWithTrashed()
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
        $roles = $this->roleRepo->listsAll();

        return view('_backend.users.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $user = $this->userRepo->create($request->except('_token'));
        $user->roles()->attach($request->get('role'));

        alert()->success(sprintf("Utilizatorul %s a fost creat!", $user->name), 'Succes!');
        return redirect()->route('users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = $this->userRepo->find($this->user->id);
        $roles = $this->roleRepo->listsAll();

        return view('_backend.users.show', compact('user', 'roles'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = $this->userRepo->find($id);

        if($this->user->id == $user->id || $this->user->isAdminOrManager())
        {
            $roles = $this->roleRepo->listsAll();

            return view('_backend.users.edit', compact('user', 'roles'));
        }

        alert()->warning('Este permisa doar editarea profilului tau', 'Info!');
        return redirect()->back();
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
        $input = empty($request->get('password')) ? $request->except(['_token', 'password']) : $request->except('_token');

        $user = $this->userRepo
            ->update($id, $input);

        $user->roles()
            ->sync([$request->get('role')]);

        alert()->success(sprintf("Utilizatorul %s a fost editat!", $user->name), 'Succes!');

        if($this->user->isAdminOrManager())
            return redirect()->route('users');

        return redirect()->route('users_show');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $this->userRepo->find($id);

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
        $user = $this->userRepo
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
        $user = $this->userRepo
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
        $user = $this->userRepo
            ->find($id);

        $this->userRepo
            ->update($id, compact('status'));

        $message = ( sprintf("Utilizatorul %s a fost %s", $user->name, ($status == 1 ? "activat!" : "dezactivat!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }

}