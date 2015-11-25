<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Page extends Model
{
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'pages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'slug', 'parent_id', 'user_id', 'status'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

    /**
     * Create the slug from the title
     */
    public function setNameAttribute($value) {
        $this->attributes['name'] = ucfirst( strtolower($value) );

        // grab the title and slugify it
        $this->attributes['slug'] = str_slug($value);
    }

    /**
     * Add the authenticated user as user who created the page
     */
    public function setUserIdAttribute($value) {
        $this->attributes['user_id'] = Auth::id();
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function user() {
		return $this->belongsTo(User::class);
	}

	/**
	 * Determine if a page has children
	 * 
	 * @return boolean
	 *
	 */
	public function hasChildren()
	{
		return in_array( $this->id, $this->lists('parent_id')->all() );
	}

	/**
	 * Get all children of a page
	 * 
	 * @return collection
	 *
	 */
	public function getChildren()
	{
		return $this->whereParentId($this->id)->get();
	}

	/**
	 * Get the first child of a page
	 * 
	 * @return item
	 *
	 */
	public function firstChild()
	{
		return $this->whereParentId($this->id)->first();
	}

	/**
	 * Determine if a page has children
	 * 
	 * @return boolean
	 *
	 */
	public function hasParent()
	{
		return in_array( $this->parent_id, $this->lists('id')->all() );
	}

	/**
	 * Get the parent of a child page
	 * 
	 * @return item
	 *
	 */
	public function getParent()
	{
		return $this->whereId($this->parent_id)->first();
	}

}
