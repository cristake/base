<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'abilities';

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

    /**
     * make the name snake case
     */
    public function setNameAttribute($value) {
        $this->attributes['name'] = str_replace( ' ', '_', strtolower($value) );
    }

    /**
     * Check if a role has a certain ability
     * @param  integer  $id
     * @return boolean
     */
    public function belongsToRole($id)
    {
    	return in_array($id, $this->roles()->lists('id')->all());
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
	public function roles() {
		return $this->belongsToMany(Role::class, 'role_abilities', 'ability_id', 'role_id');
	}
}
