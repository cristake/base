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
        if(\Auth::user()->isAdminOrManager())
            $pages = Page::withTrashed()->get();
        else
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
        Page::firstOrNew($request->except('_token'))->save();
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
        Page::findOrFail($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->destroy($id);
        $page->status = 0;
        $page->update();
    }

    /**
     * Restore the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        Page::withTrashed()->findOrFail($id)->restore();
    }

    /**
     * Mark resource as inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark($id, $status)
    {
        $page = Page::findOrFail($id);
        $page->status = $status;
        $page->update();
    }

}
