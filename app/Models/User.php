<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Hash, Auth;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, HasRolesAndAbilities, SoftDeletes;

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
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'username', 'email', 'password', 'status', 'avatar', 'provider', 'provider_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

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
     * Determine if a user is admin
     *
     * @param $password
     */
    public function isAdmin()
    {
        return $this->is('admin');
    }

    /**
     * Determine if a user is admin
     *
     * @param $password
     */
    public function isManager()
    {
        return $this->is('manager');
    }

    /**
     * Determine if a user is admin
     *
     * @param $password
     */
    public function isAdminOrManager()
    {
        return $this->is('manager') or $this->is('admin');
    }

    /**
     * Passwords must always be hashed.
     *
     * @param $password
     */
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles() {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function abilities() {
        return $this->belongsToMany(Ability::class, 'user_abilities', 'user_id', 'ability_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pages() {
        return $this->hasMany(Page::class);
    }

}
