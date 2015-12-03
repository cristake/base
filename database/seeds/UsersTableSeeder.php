<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
	public $users = [
		['id' => '1','name' => 'Cristian Iosif','email' => 'cristianiosif@me.com','password' => 'parola','status' => '1'],
        ['id' => '2','name' => 'Veronica Dragu','username' => NULL,'email' => 'veronica.dragu@icloud.com','password' => '$2y$10$irVwZJgFxWFpTOiUNqdEMufgxHd0pFYbJD7FxyMv4OMm0KqL3L/gy','status' => '1','avatar' => '','provider' => '','provider_id' => NULL,'created_by' => '1','updated_by' => '1','deleted_by' => NULL,'remember_token' => 'r62EyC1uhfgCl5d9QpTCYlDGGPg39yXEizqzFOg87Y7YDinsUdUsQWB37Vpw','created_at' => '2015-12-02 20:04:34','updated_at' => '2015-12-03 22:22:02','deleted_at' => NULL],
        ['id' => '3','name' => 'Gigi Netoiu','username' => NULL,'email' => 'gigi.netoiu@yahoo.com','password' => '$2y$10$sY9K2nxo4j3khML/BARdBuMjYK1l0VNPjtYivQZvOxHkVyWBh9hNa','status' => '1','avatar' => '','provider' => '','provider_id' => NULL,'created_by' => '1','updated_by' => '1','deleted_by' => NULL,'remember_token' => NULL,'created_at' => '2015-12-03 21:24:12','updated_at' => '2015-12-03 22:22:10','deleted_at' => NULL],
	];

    public function run()
    {
        foreach($this->users as $user)
        {
        	User::create($user);
        }
    }
}