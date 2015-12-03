<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\AbilityRepositoryInterface;
use App\Repositories\RoleRepositoryInterface;
use JavaScript;

class AbilityController extends Controller
{
    /**
     * @var AbilityRepositoryInterface
     */
    protected $abilityRepo;

    /**
     * @var RoleRepositoryInterface
     */
    protected $roleRepo;

    /**
     * Inject the interface
     * @param AbilityRepositoryInterface $abilityRepo 
     * @param RoleRepositoryInterface $roleRepo 
     */
    public function __construct(
        AbilityRepositoryInterface $abilityRepo,
        RoleRepositoryInterface $roleRepo
    )
    {
        $this->abilityRepo = $abilityRepo;
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
            'abilities' => $this->abilityRepo->getAll()
        ]);

        return view('_backend.abilities.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = $this->roleRepo->getAll();

        return view('_backend.abilities.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ability = $this->abilityRepo->create($request->except(['_token', 'roles']));

        foreach($request->get('roles') as $role_id)
        {
            $ability->roles()->attach($role_id);
        }

        alert()->success(sprintf("Abilitatea %s a fost creata!", $ability->name), 'Succes!');
        return redirect()->route('abilities');
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
        $ability = $this->abilityRepo->find($id);

        return view('_backend.abilities.edit', compact('ability'));
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
        $role = $this->abilityRepo->update($id, $request->except('_token'));

        alert()->success(sprintf("Abilitatea %s a fost editata!", $role->name), 'Succes!');
        return redirect()->route('abilities');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ability = $this->abilityRepo->find($id);

        $ability->delete($id);

        alert()->success( sprintf('Rolul %s a fost sters!', $ability->name), 'Succes!' );
        return redirect()->route('abilities');
    }
}
