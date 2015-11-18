<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon as Carbon;
use App\Models\User;

class UserTableSeeder extends Seeder
{
	public $users = [
		['id' => '1','name' => 'Cristian Iosif','email' => 'cristianiosif@me.com','password' => 'parola','status' => '1'],
		['id' => '2','name' => 'Veronica Dragu','email' => 'veronicadragu@me.com','password' => 'parola','status' => '1'],
	];

    public function run()
    {
        foreach($this->users as $user)
        {
        	User::create($user);
        }
    }
}