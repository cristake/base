<?php

namespace App\Repositories;

abstract class BaseRepository
{

    // Get all records

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
     * Get all resources with their relations
     */
    public function getAllWith($relations = [])
    {
        return $this->model->with($relations)->get();
    }


    // Get paginated set of records


    // Create a new record

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
     * Persist the resource
     */
    public function save()
    {
        $this->model->save();

        return $this->model;
    }

    // Get record by it’s primary key

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


    // Get record by some other attribute


    // Update a record

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


    // Delete a record

}