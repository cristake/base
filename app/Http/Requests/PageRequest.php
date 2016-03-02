<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class PageRequest extends Request
{
    protected $rules = [
        'name.ro'     => 'required|min:3',
        'name.en'     => 'required|min:3',
    ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->rules;
    }
}
