<?php

use Illuminate\Database\Seeder;

class RoleAbilitiesTableSeeder extends Seeder
{
	public $role_abilities = [
        ['ability_id' => '1','role_id' => '1'],
        ['ability_id' => '2','role_id' => '1'],
        ['ability_id' => '3','role_id' => '1'],
        ['ability_id' => '4','role_id' => '1'],
        ['ability_id' => '5','role_id' => '1'],
        ['ability_id' => '6','role_id' => '1'],
        ['ability_id' => '7','role_id' => '1'],
        ['ability_id' => '8','role_id' => '1'],
        ['ability_id' => '9','role_id' => '1'],
        ['ability_id' => '10','role_id' => '1'],
        ['ability_id' => '11','role_id' => '1'],
        ['ability_id' => '12','role_id' => '1'],
        ['ability_id' => '13','role_id' => '1'],
        ['ability_id' => '1','role_id' => '2'],
        ['ability_id' => '2','role_id' => '2'],
        ['ability_id' => '3','role_id' => '2'],
        ['ability_id' => '4','role_id' => '2'],
        ['ability_id' => '5','role_id' => '2'],
        ['ability_id' => '9','role_id' => '2'],
        ['ability_id' => '11','role_id' => '2'],
        ['ability_id' => '13','role_id' => '2'],
        ['ability_id' => '1','role_id' => '3'],
	];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role_abilities')->insert($this->role_abilities);
    }
}
