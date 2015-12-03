<?php

namespace App\Repositories;

abstract class BaseRepository
{
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
     * Creates a new resource
     * @param  array $request 
     * @return response
     */
    public function create($request)
    {
        return $this->model
            ->create($request);
    }

    /**
     * Updates a resource
     * @param  array $request
     * @param  integer $id
     * @return response
     */
    public function update($id, $request)
    {
        $model = $this->model
            ->findOrFail($id);

        $model->update($request);

        return $model;
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

}