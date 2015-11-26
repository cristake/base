<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
	public $users = [
		['id' => '1','name' => 'Cristian Iosif','email' => 'cristianiosif@me.com','password' => 'parola','status' => '1'],
	];

    public function run()
    {
        foreach($this->users as $user)
        {
        	User::create($user);
        }
    }
}