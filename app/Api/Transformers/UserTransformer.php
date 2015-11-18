<?php 

namespace Api\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;

class UserTransformer extends TransformerAbstract
{

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
            'active'		=> (boolean) $user->status,
            'created_at'	=> $user->created_at->format('d-m-Y'),
            'updated_at'	=> $user->updated_at->format('d-m-Y'),
        ];
    }

}