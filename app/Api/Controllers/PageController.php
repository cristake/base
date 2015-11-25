<?php

namespace Api\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\Page;
use Api\Transformers\PageTransformer;

class PageController extends Controller
{
    public function __construct()
    {
        // $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $pages = Page::all();

        $meta = [
            'total' => count($pages)
        ];

        return $this->response->collection($pages, new PageTransformer)->setMeta($meta);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $page = Page::findOrFail($id);

        return $this->response->item($page, new PageTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $page = new Page;

        $page->create($request->all());
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
        $page = Page::findOrFail($id);

        $page->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $page = Page::findOrFail($id);
        $page->destroy($id);
    }

    /**
     * Mark user as inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark(Request $request, $id, $status)
    {
        $page = Page::findOrFail($id);
        $page->status = $status;
        $page->update();
    }

}
