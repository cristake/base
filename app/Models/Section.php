<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Section extends Model
{
    use SoftDeletes;

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
	protected $table = 'sections';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['code', 'title', 'photo', 'content', 'page_id', 'status'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function page() {
		return $this->belongsTo(Page::class);
	}

	/**
	 * Setting the authenticated user when creating a resource
     */
	public function save(array $options = array())
	{
	    if( ! $this->created_by)
	    {
	        $this->created_by = Auth::id();
	    }
	    parent::save($options);
	}

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
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function user() {
		return $this->belongsTo(User::class, 'created_by');
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

}
