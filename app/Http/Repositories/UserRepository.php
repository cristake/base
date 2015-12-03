<?php

namespace App\Http\Repositories;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model = null;

    /**
     * Inject the model
     * @param User $model 
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * Get all resources including soft deletes
     * @return collection
     */
    public function getAllWithTrashed()
    {
        return $this->model
            ->withTrashed()
            ->get();
    }

    /**
     * Get all resources without soft deletes
     * @return collection
     */
    public function getAll()
    {
        return $this->model
            ->all();
    }

    /**
     * Find a specific resource item
     * @param  integer $id 
     * @return Item
     */
    public function find($id)
    {
        return $this->model
            ->findOrFail($id);
    }

    /**
     * Find a specific resourse including soft deletes
     * @param  integer $id
     * @return Item
     */
    public function findWithTrashed($id)
    {
        return $this->model
            ->withTrashed()
            ->findOrFail($id);
    }

    /**
     * Creates a new resource
     * @param  array $request 
     * @return response
     */
    public function create($request)
    {
        return $this->model
            ->create($request);
            // ->firstOrNew($request)
            // ->save();
    }

    /**
     * Updates a resource
     * @param  array $request
     * @param  integer $id
     * @return response
     */
    public function update($id, $request)
    {
        return $this->model
            ->findOrFail($id)
            ->update($request);
    }

    /**
     * Filter the results, without trashed
     * @param  array  $params
     * @return collection
     */
    public function filter($params = [])
    {
        return $this->model
            ->where($params)
            ->get();
    }

    /**
     * Filter the results, with trashed
     * @param  array  $params
     * @return collection
     */
    public function filterWithTrashed($params = [])
    {
        return $this->model
            ->withTrashed()
            ->where($params)
            ->get();
    }

    /**
     * [findByUserNameOrCreate description]
     * @param  [type] $userData [description]
     * @param  [type] $provider [description]
     * @return [type]           [description]
     */
    public function findByUserNameOrCreate($userData, $provider)
    {
        $user = $this->model
            ->where('provider_id', '=', $userData->id)->first();

        if(!$user) {
            $user = $this->model->create([
                'provider'		=> $provider,
                'provider_id'	=> $userData->id,
                'name'			=> $userData->name,
                'username'		=> $userData->nickname,
                'email'			=> $userData->email,
                'avatar'		=> $userData->avatar,
            ]);
        }

        $this->checkIfUserNeedsUpdating($userData, $user);

        return $user;
    }

    /**
     * [checkIfUserNeedsUpdating description]
     * @param  [type] $userData [description]
     * @param  [type] $user     [description]
     * @return [type]           [description]
     */
    public function checkIfUserNeedsUpdating($userData, $user)
    {
        $socialData = [
            'avatar' => $userData->avatar,
            'email' => $userData->email,
            'name' => $userData->name,
            'username' => $userData->nickname,
        ];
        $dbData = [
            'avatar' => $user->avatar,
            'email' => $user->email,
            'name' => $user->name,
            'username' => $user->username,
        ];

        if (!empty(array_diff($socialData, $dbData))) {
            $user->avatar = $userData->avatar;
            $user->email = $userData->email;
            $user->name = $userData->name;
            $user->username = $userData->nickname;
            $user->save();
        }
    }
}