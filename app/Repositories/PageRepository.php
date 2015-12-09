<?php

namespace App\Repositories;

use App\Models\Page as Model;

class PageRepository extends BaseRepository implements PageRepositoryInterface
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

    public function translate($locale, $attributes = [])
    {
        foreach($attributes as $attr => $value)
        {
            $this->model->translateOrNew($locale)->{$attr} = $value;
        }
        $this->model->save();

        return $this->model;
    }
}