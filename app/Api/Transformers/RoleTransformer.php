<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Role;

class RoleTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    // protected $defaultIncludes = [
    //     'abilities'
    // ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'abilities'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Role $role)
    {
        return [
            'id'            => (int) $role->id,
            'name'          => $role->name,
            'created_at'	=> $role->created_at->format('d-m-Y'),
            'updated_at'	=> $role->updated_at->format('d-m-Y'),
        ];
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    public function includeAbilities(Role $role)
    {
        $abilities = $role->abilities;

        return $this->collection($abilities, new AbilityTransformer);
    }
}