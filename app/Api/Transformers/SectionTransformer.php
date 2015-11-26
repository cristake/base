<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Section;

class SectionTransformer extends TransformerAbstract
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
    protected $availableIncludes = [
        'page'
    ];


    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Section $section)
    {
        return [
            'id'            => (int) $section->id,
            'page_id'       => (int) $section->page_id,
            'code'          => $section->code,
            'title'         => $section->title,
            'photo'         => $section->photo,
            'content'       => $section->content,
            'active'        => (boolean) $section->status,
            'created_by'    => $section->created_by ? $section->user->name : null,
            'updated_by'    => $section->updated_by ? $section->user->name : null,
            'deleted_by'    => $section->deleted_by ? $section->user->name : null,
            'created_at'	=> $section->created_at->format('d-m-Y H:i:s'),
            'updated_at'    => $section->updated_at->format('d-m-Y H:i:s'),
            'deleted_at'	=> $section->deleted_at ? $section->deleted_at->format('d-m-Y H:i:s') : null,
        ];
    }

    /**
     * Include Author
     *
     * @return League\Fractal\ItemResource
     */
    public function includePage(Section $section)
    {
        $page = $section->page;

        return $this->item($page, new PageTransformer);
    }

}