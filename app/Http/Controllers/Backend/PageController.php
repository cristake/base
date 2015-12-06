<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Repositories\PageRepositoryInterface;
use JavaScript;

class PageController extends Controller
{
    /**
     * @var PageRepositoryInterface
     */
    protected $pageRepo;

    /**
     * Inject the interface
     * @param PageRepositoryInterface $pageRepo 
     */
    public function __construct(PageRepositoryInterface $pageRepo)
    {
        $this->pageRepo = $pageRepo;

        parent::__construct();
    }

    /**
     * Bind the given array of variables to the view.
     * 
     * @return JavaScript
     * @return \Illuminate\View\View
     */
    public function index()
    {
        JavaScript::put([
            'pages' => $this->pageRepo->getAllWith(['sections'])
        ]);

        return view('_backend.pages.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $pages = $this->pageRepo->getAll();

        return view('_backend.pages.create', compact('pages'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePageRequest $request)
    {
        $input = $request->except('_token');
        // $this->pageRepo->translateOrNew('ro', 'name', $request->get('name'));

        // $page = $this->pageRepo->save();
        $page = $this->pageRepo->create($input);

        alert()->success(sprintf("Pagina %s a fost creata!", $page->name), 'Succes!');
        return redirect()->route('pages');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $page = $this->pageRepo->find($id);

        // Returnez doar paginile principale
        $pages = $this->pageRepo->getAll()->filter(function($page)
        {
            return !$page->hasParent();
        });

        return view('_backend.pages.edit', compact('pages', 'page'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePageRequest $request, $id)
    {
        $page = $this->pageRepo->find($id);

        if($page->hasChildren())
        {
            alert()->warning(sprintf("Pagina '%s' are submeniuri si nu poate fi definita ca pagina secundara!", $page->name), 'Info!');
            return redirect()->back();
        }

        $this->pageRepo
            ->update($id, $request->except('_token'));

        alert()->success(sprintf("Pagina %s a fost editata!", $page->name), 'Succes!');
        return redirect()->route('pages');
    }

    /**
     * Soft delete the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = $this->pageRepo->find($id);

        // $page->status = 0;
        // $page->update();

        $page->delete($id);

        alert()->success( sprintf('Pagina %s a fost stearsa!', $page->name), 'Succes!' );
        return redirect()->route('pages');
    }

    /**
     * Restore the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        alert()->success( 'Pagina a fost restaurata!', 'Success' );
        return redirect()->route('pages');
    }

    /**
     * Permanently remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($id)
    {
        alert()->success( sprintf('Pagina %s a fost stearsa definitiv!', $page->name), 'Succes!' );
        return redirect()->route('pages');
    }

    /**
     * Mark resource as active / inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark($id, $status)
    {
        $message = ( sprintf("Pagina %s a fost %s", $page->name, ($page->status == 1 ? "activata!" : "dezactivata!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }
}
