<?php

use Illuminate\Database\Seeder;
use App\Models\Page;

class PagesTableSeeder extends Seeder
{
	public $pages = [
        ['id' => '1','name' => 'Home','slug' => 'home','parent_id' => '0','status' => '1','created_by' => '1','updated_by' => NULL,'deleted_by' => NULL,'created_at' => '2015-12-02 20:31:56','updated_at' => '2015-12-02 20:31:56'],
        ['id' => '2','name' => 'Who are we','slug' => 'who-are-we','parent_id' => '0','status' => '1','created_by' => '1','updated_by' => NULL,'deleted_by' => NULL,'created_at' => '2015-12-02 20:32:06','updated_at' => '2015-12-02 20:32:06'],
        ['id' => '3','name' => 'About us','slug' => 'about-us','parent_id' => '2','status' => '1','created_by' => '1','updated_by' => NULL,'deleted_by' => NULL,'created_at' => '2015-12-02 20:32:16','updated_at' => '2015-12-02 20:32:16'],
        ['id' => '4','name' => 'Certificates','slug' => 'certificates','parent_id' => '2','status' => '1','created_by' => '1','updated_by' => NULL,'deleted_by' => NULL,'created_at' => '2015-12-02 20:32:26','updated_at' => '2015-12-02 20:32:26'],
	];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->pages as $user)
        {
        	Page::create($user);
        }
    }
}
