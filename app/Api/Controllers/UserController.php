<?php

namespace Api\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Api\Repositories\UserRepository;
use Api\Transformers\UserTransformer;

class UserController extends Controller
{
    protected $repo;

    public function __construct(UserRepository $repo)
    {
        // $this->middleware('jwt.auth', ['except' => 'getAuthenticatedUser']);

        $this->repo = $repo;

        // parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        if(isset($this->user) && $this->user->isAdminOrManager())
            $users = $request->ajax() ? $this->repo->getAllWithTrashed() : $this->repo->filterWithTrashed( $request->all() );
        else
            $users = $request->ajax() ? $this->repo->getAll() : $this->repo->filter( $request->all() );

        $meta = [
            'total' => count($users)
        ];

        return $this->response
            ->collection($users, new UserTransformer)
            ->setMeta($meta);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = $this->repo->findWithTrashed($id);

        return $this->response
            ->item($user, new UserTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->repo
            ->create($request->except(['_token', 'password_confirmation']));

        return $this->response
            ->created();
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
        $this->repo
            ->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $this
            ->repo->find($id);

        $user->destroy($id);

        $user->status = 0;

        $user->update();
    }

    /**
     * Restore the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $this->repo
            ->findWithTrashed($id)
            ->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($id)
    {
        $user = $this->repo
            ->findWithTrashed($id);

        $user->forceDelete($id);
    }

    /**
     * Mark resource as inactive
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function mark($id, $status)
    {
        $this->repo
            ->update($id, compact('status'));
    }

    /**
     * Display theauthenticated user
     *
     * @return Response
     */
    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

}
