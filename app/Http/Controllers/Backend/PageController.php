<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePageRequest;
use App\Http\Requests\UpdatePageRequest;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('_backend.pages.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $pages = $this->api->get('api/pages');

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
        $this->api->post('api/pages', $request->all());

        alert()->success(sprintf("Pagina %s a fost creat!", $request->get('name')), 'Succes!');
        return redirect()->route('pages');
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
        $pages = $this->api->get('api/pages');
        $page = $this->api->get('api/pages/' . $id);

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
        $this->api->put('api/pages/'. $id, $request->all());

        alert()->success(sprintf("Pagina %s a fost editata!", $request->get('name')), 'Succes!');
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
        $page = $this->api->get('api/pages/' . $id);

        $this->api->delete('api/pages/'. $id);

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
        $this->api->get( sprintf('api/pages/%d/restore', $id) );

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
        $page = $this->api->get('api/pages/' . $id);

        $this->api->get(sprintf('api/pages/%d/forceDelete', $id));

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
        $page = $this->api->get( sprintf('api/pages/%d', $id));

        $this->api->get(sprintf('api/pages/%d/mark/%d', $id, $status));

        $message = ( sprintf("Pagina %s a fost %s", $page->name, ($page->status == 1 ? "activata!" : "dezactivata!")) );
        alert()->success($message, 'Succes!');

        return redirect()->back();
    }
}
