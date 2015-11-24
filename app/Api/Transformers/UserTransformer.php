<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;
use Api\Transformers\RoleTransformer;

class UserTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    // protected $defaultIncludes = [
    //     'roles',
    //     'abilities',
    // ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'roles',
        'abilities',
    ];

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'            => (int) $user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'active'        => (boolean) $user->status,
            'created_at'	=> $user->created_at->format('d-m-Y H:i:s'),
            'updated_at'	=> $user->updated_at->format('d-m-Y H:i:s'),
            'links'         => [
                'rel'   => 'self',
                'uri'   => route('api.users.show', $user->id)
            ],
        ];
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    public function includeRoles(User $user)
    {
        $roles = $user->roles;

        return $this->collection($roles, new RoleTransformer);
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    public function includeAbilities(User $user)
    {
        $abilities = $user->abilities;

        return $this->collection($abilities, new AbilityTransformer);
    }

}