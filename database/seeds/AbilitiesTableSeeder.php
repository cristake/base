<?php

use Illuminate\Database\Seeder;

class AbilitiesTableSeeder extends Seeder
{
	public $abilities = [
        ['id' => '1','name' => 'view_users','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:03:16','updated_at' => '2015-12-04 12:03:16'],
        ['id' => '2','name' => 'create_users','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:03:28','updated_at' => '2015-12-04 12:03:28'],
        ['id' => '3','name' => 'edit_users','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:03:44','updated_at' => '2015-12-04 12:03:44'],
        ['id' => '4','name' => 'delete_users','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:05:09','updated_at' => '2015-12-04 12:05:09'],
        ['id' => '5','name' => 'view_roles','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:05:30','updated_at' => '2015-12-04 12:05:30'],
        ['id' => '6','name' => 'create_roles','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:06:03','updated_at' => '2015-12-04 12:06:03'],
        ['id' => '7','name' => 'edit_roles','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:06:22','updated_at' => '2015-12-04 12:06:22'],
        ['id' => '8','name' => 'delete_roles','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:06:38','updated_at' => '2015-12-04 12:06:38'],
        ['id' => '9','name' => 'view_abilities','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:06:52','updated_at' => '2015-12-04 12:06:52'],
        ['id' => '10','name' => 'create_abilities','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:07:06','updated_at' => '2015-12-04 12:07:06'],
        ['id' => '11','name' => 'edit_abilities','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:07:15','updated_at' => '2015-12-04 12:07:15'],
        ['id' => '12','name' => 'delete_abilities','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:07:24','updated_at' => '2015-12-04 12:07:24'],
        ['id' => '13','name' => 'view_settings','entity_id' => NULL,'entity_type' => NULL,'created_at' => '2015-12-04 12:07:53','updated_at' => '2015-12-04 12:07:53'],
	];

    public function run()
    {
        DB::table('abilities')->insert($this->abilities);
    }
}