<?php

namespace App\Repositories;

use App\Models\Role as Model;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Inject the model
     * @param Model $model 
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }


    /**
     * Lists all the resources
     * @return array 
     */
    public function listsAll()
    {
        return $this->model
            ->lists('name', 'id')
            ->all();
    }

}