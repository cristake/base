<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserRequest extends Request
{
    protected $rules = [
        'name' => 'required|min:3',
        'email' => 'required|email|unique:users,email',
        'role' => 'required',
        'password' => 'required|min:6|confirmed',
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
        if (in_array($this->method(), ['PUT', 'PATCH']))
        {
            array_forget($this->rules, 'email');
            array_add($this->rules, 'email', 'required|email|unique:users,email,' . $this->route('users_update'));
        }
        return $this->rules;
    }
}
