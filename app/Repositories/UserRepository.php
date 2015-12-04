<?php

namespace App\Repositories;

use App\Models\User as Model;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model = null;

    /**
     * Inject the model
     * @param Model $model 
     */
    public function __construct(Model $model)
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
     * Get a user by their email address
     * @param  string $email
     * @return Item
     */
    public function findByEmail($email)
    {
        return $this->model
            ->whereEmail($email)
            ->first();
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