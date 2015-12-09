<?php

namespace App\Repositories;

interface PageRepositoryInterface
{
	public function getAll();

	public function getAllWith($relations = []);

	public function find($id);

	public function create($request);

	public function save();

	public function update($id, $request);

	public function filter($params);

	public function translate($locale, $attributes = []);

}