<?php

namespace App\Repositories;

interface PageRepositoryInterface
{
	public function getAll();

	public function find($id);

	public function create($request);

	public function update($id, $request);

	public function filter($params);
}