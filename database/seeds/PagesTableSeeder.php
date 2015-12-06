<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    public $pages = [
    ];

	public $page_translations = [
	];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pages')->insert($this->pages);

        DB::table('page_translations')->insert($this->page_translations);
    }
}
