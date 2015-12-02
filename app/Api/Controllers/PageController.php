<?php

namespace Api\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Api\Repositories\PageRepository;
use Api\Transformers\PageTransformer;

class PageController extends Controller
{
    protected $repo;

    public function __construct(PageRepository $repo)
    {
        // $this->middleware('jwt.auth');
        $this->repo = $repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        // if(\Auth::user()->isAdminOrManager())
        //     $pages = Page::withTrashed()->get();
        // else
        if($request->ajax())
            $pages = $this->repo->getAll();
        else
            $pages = $this->repo->filter($request->all());

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
        // $page = Page::withTrashed()->findOrFail($id);
        $page = $this->repo->find($id);

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
        // Page::firstOrNew($request->except('_token'))->save();
        $this->repo->create( $request->except('_token') );
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
        // Page::findOrFail($id)->update($request->all());
        $this->repo->update( $id, $request->except('_token') );
    }

    /**
     * Soft delete the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete($id);
        $page->status = 0;
        $page->update();
    }

    /**
     * Restore the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function restore($id)
    // {
    //     Page::withTrashed()->findOrFail($id)->restore();
    // }

    /**
     * Permanently remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function forceDelete($id)
    // {
    //     $page = Page::withTrashed()->findOrFail($id);
    //     $page->forceDelete($id);
    // }

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
