<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id');
            $table->string('name', 30); // de mutat la translations
            $table->string('slug', 30); // de mutat la translations
            $table->smallInteger('status')->default(1);
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Schema::create('page_translations', function (Blueprint $table) {
        //     $table->increments('id');
        //     $table->integer('page_id')->unsigned();
        //     $table->string('name', 30);
        //     $table->string('slug', 30);
        //     $table->string('locale')->index();

        //     $table->unique(['page_id','locale']);
        //     $table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::drop('pages');
        // Schema::drop('page_translations');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
