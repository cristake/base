<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Page;

class PageTransformer extends TransformerAbstract
{
    /**
     * List of params to use for filtering
     *
     * @var array
     */
    // private $validParams = ['limit', 'order'];


    /**
     * List of resources to automatically include
     *
     * @var array
     */
    // protected $defaultIncludes = [
    // ];


    /**
     * List of resources possible to include
     *
     * @var array
     */
    // protected $availableIncludes = [
    // ];


    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Page $page)
    {
        return [
            'id'            => (int) $page->id,
            'name'          => $page->name,
            'slug'          => $page->hasParent() ? $page->getParent()->slug . '/' . $page->slug : $page->slug,
            'parent'        => $page->hasParent() ? $page->getParent()->name : '-',
            'created_by'    => $page->user->name,
            'active'        => (boolean) $page->status,
            'created_at'	=> $page->created_at->format('d-m-Y H:i:s'),
            'updated_at'    => $page->updated_at->format('d-m-Y H:i:s'),
            'deleted_at'	=> $page->deleted_at ? $page->deleted_at->format('d-m-Y H:i:s') : null,
        ];
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    // public function includeRoles(Page $page)
    // {
    //     $roles = $page->roles;

    //     return $this->collection($roles, new RoleTransformer);
    // }

}