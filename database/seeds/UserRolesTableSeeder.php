<?php

use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    public $user_roles = [
        ['role_id' => '1','user_id' => '1'],
        ['role_id' => '2','user_id' => '2'],
        ['role_id' => '3','user_id' => '3'],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert($this->user_roles);
    }
}
