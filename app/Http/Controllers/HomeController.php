<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;

class HomeController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // $users = $this->api->get('api/users?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2Jhc2UuZGV2XC9hcGlcL2F1dGhlbnRpY2F0ZSIsImlhdCI6IjE0NDc5MjQzNzkiLCJleHAiOiIxNDQ3OTI3OTc5IiwibmJmIjoiMTQ0NzkyNDM3OSIsImp0aSI6ImFjNDA3YWRlZDFhZjg4ODQ4M2ExMzU0ZDkxMmI2YjdlIn0.MTQzODM0YzE4MDg2YTUyOWNiYjI2ODJlNjRmYmIyZTdmOGRkMWE3ZTA5ZTViODhlNjE2NjViN2NlYjQyZDA4ZQ');
        $users = $this->api->get('api/users');

        return view('welcome', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
