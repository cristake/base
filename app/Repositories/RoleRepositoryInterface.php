<?php

namespace App\Repositories;

interface RoleRepositoryInterface
{
	public function getAll();

	public function listsAll();

	public function create($request);

	public function find($id);

	public function update($id, $request);

	public function filter($params);

}