<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageTranslation extends Model
{	
	/**
	 * Timestampls not available on the transplations table
	 */
    public $timestamps = false;

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['page_id', 'locale', 'name', 'slug'];

    /**
     * Create the slug from the name
     */
    public function setNameAttribute($value) {
        $this->attributes['name'] = ucfirst( strtolower($value) );

        // grab the name and slugify it
        $this->attributes['slug'] = str_slug($value);
    }

}
