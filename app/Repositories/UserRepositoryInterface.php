<?php

namespace App\Repositories;

interface UserRepositoryInterface
{
	public function getAllWithTrashed();

	public function getAll();

	public function findWithTrashed($id);

	public function find($id);

	public function findByEmail($email);

	public function create($request);

	public function update($id, $request);

	public function filter($params);

	public function filterWithTrashed($params);

	public function findByUserNameOrCreate($userData, $provider);

	public function checkIfUserNeedsUpdating($userData, $user);

}