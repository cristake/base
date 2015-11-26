<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('page_id')->unsigned();
            $table->string('code');
            $table->string('title');
            $table->string('photo')->nullable();
            $table->string('content')->nullable();
            $table->smallInteger('status')->default(1);
            $table->integer('created_by')->unsigned();
            $table->integer('updated_by')->unsigned();
            $table->integer('deleted_by')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('page_id')->references('id')->on('pages')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sections');
    }
}
