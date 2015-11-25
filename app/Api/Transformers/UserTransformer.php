<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use League\Fractal\ParamBag;
use App\Models\User;
use Api\Transformers\RoleTransformer;

class UserTransformer extends TransformerAbstract
{
    /**
     * List of params to use for filtering
     *
     * @var array
     */
    private $validParams = ['limit', 'order'];


    /**
     * List of resources to automatically include
     *
     * @var array
     */
    // protected $defaultIncludes = [
    //     'roles',
    //     'abilities',
    //     'pages',
    // ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'roles',
        'abilities',
        'pages',
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
            'deleted_at'    => $user->deleted_at ? $user->deleted_at->format('d-m-Y H:i:s') : null,
            'links'         => [
                'rel'   => 'self',
                'uri'   => route('api.users.show', $user->id)
            ],
        ];
    }

    /**
     * Include Role
     *
     * @return League\Fractal\ItemResource
     */
    public function includeRoles(User $user)
    {
        $roles = $user->roles;

        return $this->collection($roles, new RoleTransformer);
    }

    /**
     * Include Ability
     *
     * @return League\Fractal\ItemResource
     */
    public function includeAbilities(User $user)
    {
        $abilities = $user->abilities;

        return $this->collection($abilities, new AbilityTransformer);
    }

    /**
     * Include Page
     *
     * @return League\Fractal\ItemResource
     */
    public function includePages(User $user, ParamBag $params)
    {
        // Optional params validation
        $usedParams = array_keys(iterator_to_array($params));
        if ($invalidParams = array_diff($usedParams, $this->validParams)) {
            throw new \Exception(sprintf('Invalid param(s): "%s". Valid param(s): "%s"', implode(',', $usedParams), implode(',', $this->validParams)));
        }

        // Processing
        list($limit, $offset) = $params->get('limit');
        list($orderCol, $orderBy) = $params->get('order');

        $pages = $user->pages()
            ->take($limit)
            ->skip($offset)
            ->orderBy($orderCol, $orderBy)
            ->get();

        return $this->collection($pages, new PageTransformer);
    }

}