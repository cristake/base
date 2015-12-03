<?php

namespace App\Http\Repositories;

use App\Models\Page;

class PageRepository implements PageRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Inject the model
     * @param Page $model 
     */
    public function __construct(Page $model)
    {
        $this->model = $model;
    }

    /**
     * Get all the resources
     * @return collection 
     */
    public function getAll()
    {
        return $this->model
            ->all();
    }

    /**
     * Get a specific resource item
     * @param  integer $id 
     * @return Item
     */
    public function find($id)
    {
        return $this->model
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
            ->firstOrNew($request)
            ->save();
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


    public function filter($params = [])
    {
        return $this->model
            ->where($params)
            ->get();
    }

}