<?php

use Illuminate\Database\Seeder;
use App\Models\Page;

class PagesTableSeeder extends Seeder
{
	public $pages = [
		['id' => '1','name' => 'Home','slug' => 'home','parent_id' => 0,'user_id' => 1],
		['id' => '2','name' => 'Why Us','slug' => 'why-us','parent_id' => 0,'user_id' => 1],
		['id' => '3','name' => 'About Us','slug' => 'about-us','parent_id' => 2,'user_id' => 1],
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
