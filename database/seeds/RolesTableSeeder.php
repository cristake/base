<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
	public $roles = [
		['id' => '1','name' => 'admin','created_at' => '2015-11-26 17:03:14','updated_at' => '2015-11-26 17:03:14'],
        ['id' => '2','name' => 'manager','created_at' => '2015-12-03 22:21:12','updated_at' => '2015-12-03 22:21:12'],
        ['id' => '3','name' => 'user','created_at' => '2015-12-03 22:21:24','updated_at' => '2015-12-03 22:21:24'],
	];

    public function run()
    {
        foreach($this->roles as $role)
        {
        	Role::create($role);
        }
    }
}