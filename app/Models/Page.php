<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dimsav\Translatable\Translatable;
use Auth;

class Page extends Model
{
    use SoftDeletes, Translatable;
	
	/**
     * Translatable columns
     *
     * @var array
     */
	public $translatedAttributes = ['name', 'slug'];


	/**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['translations'];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

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
     * Create the slug from the name
     */
    // public function setNameAttribute($value) {
    //     $this->attributes['name'] = ucfirst( strtolower($value) );

    //     // grab the name and slugify it
    //     $this->attributes['slug'] = str_slug($value);
    // }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function user() {
		return $this->belongsTo(User::class, 'created_by');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function sections() {
		return $this->hasMany(Section::class);
	}

	/**
	 * Setting the authenticated user when creating a resource
     */
	// public function save(array $options = array())
	// {
	//     if( ! $this->created_by)
	//     {
	//         $this->created_by = Auth::id();
	//     }
	//     parent::save($options);
	// }

	/**
	 * Setting the authenticated user when updating a resource
     */
	public function update(array $options = array())
	{
	    if( ! $this->updated_by)
	    {
	        $this->updated_by = Auth::id();
	    }
	    parent::update($options);
	}

	/**
	 * Setting the authenticated user when deleting a resource
     */
	public function delete()
	{
	    if( ! $this->deleted_by)
	    {
	        $this->deleted_by = Auth::id();
	    }
	    parent::delete();
	}

    /**
     * Scope a query to only include active pages.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 1)->get();
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
