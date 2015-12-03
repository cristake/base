<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\RoleRepositoryInterface;
use JavaScript;

class RoleController extends Controller
{
    /**
     * @var RoleRepositoryInterface
     */
    protected $roleRepo;

    /**
     * Inject the interface
     * @param RoleRepositoryInterface $roleRepo 
     */
    public function __construct(RoleRepositoryInterface $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        JavaScript::put([
            'roles' => $this->roleRepo->getAll()
        ]);

        return view('_backend.roles.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('_backend.roles.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $role = $this->roleRepo->create($request->except('_token'));

        alert()->success(sprintf("Rolul %s a fost creat!", $role->name), 'Succes!');
        return redirect()->route('roles');
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
        $role = $this->roleRepo->find($id);

        return view('_backend.roles.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = $this->roleRepo->update($id, $request->except('_token'));

        alert()->success(sprintf("Rolul %s a fost editat!", $role->name), 'Succes!');
        return redirect()->route('roles');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = $this->roleRepo->find($id);

        $role->delete($id);

        alert()->success( sprintf('Rolul %s a fost sters!', $role->name), 'Succes!' );
        return redirect()->route('roles');
    }
}
