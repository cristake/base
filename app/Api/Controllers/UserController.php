<?php

namespace Api\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Api\Transformers\UserTransformer;

class UserController extends BaseApiController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth');
    }

    /**
     * Return the users
     *
     * @return Response
     */
    public function index()
    {
        $users = User::all();

        $meta = [
            'total' => count($users)
        ];

        return $this->response->collection($users, new UserTransformer)->setMeta($meta);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return $this->response->item($user, new UserTransformer);
    }


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
