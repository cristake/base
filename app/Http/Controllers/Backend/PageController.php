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
