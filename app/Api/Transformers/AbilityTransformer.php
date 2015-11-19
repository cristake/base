<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Ability;

class AbilityTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    // protected $defaultIncludes = [
    //     'links'
    // ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'roles'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Ability $ability)
    {
        return [
            'id'            => (int) $ability->id,
            'name'          => $ability->name,
            'entity_id'     => $ability->entity_id,
            'entity_type'   => $ability->entity_type,
            'created_at'	=> $ability->created_at->format('d-m-Y'),
            'updated_at'	=> $ability->updated_at->format('d-m-Y'),
        ];
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    public function includeRoles(Ability $ability)
    {
        $roles = $ability->roles;

        return $this->collection($roles, new RoleTransformer);
    }
}