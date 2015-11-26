<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
	public $roles = [
		['id' => '1','name' => 'admin','created_at' => '2015-11-26 17:03:14','updated_at' => '2015-11-26 17:03:14'],
	];

    public function run()
    {
        foreach($this->roles as $role)
        {
        	Role::create($role);
        }
    }
}