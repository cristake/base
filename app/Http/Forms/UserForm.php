<?php

namespace App\Http\Forms;

use Kris\LaravelFormBuilder\Form;

class UserForm extends Form
{
	public function buildForm()
	{
		$this
			->add('name', 'text', [
				'label' => 'Nume',
				'rules' => 'required|min:5',
				'help_block' => [
					'text' => '<i class="fa fa-pencil"></i> Nume si prenume',
					'attr' => ['class' => 'help-block']
				]
			])

			->add('email', 'email', [
				'label' => 'Email',
				'rules' => 'required|email|uniques:users,email',
				'help_block' => [
					'text' => '<i class="fa fa-pencil"></i> Adresa de email'
				]
			])

			->add('password', 'repeated', [
				'wrapper' => ['class' => ''],
				'type' => 'password',
				'second_name' => 'password_confirmation',
				'first_options' => [
					'wrapper' => ['class' => 'form-group'],
					'label' => 'Parola', 
					'rules' => 'min:6|confirmed',
					'help_block' => [
						'text' => '<i class="fa fa-lock"></i> Minim 6 caractere'
					]
				],
				'second_options' => [
					'wrapper' => ['class' => 'form-group'],
					'label' => 'Confirmare parola',
					'help_block' => [
						'text' => '<i class="fa fa-lock"></i> Reintroducere parola'
					]
				],
			])

			->add('save', 'submit', [
				'label' => 'Salveaza',
 				'wrapper' => ['class' => 'col-md-offset-2 col-md-6'],
				'attr' => [
					'class' => 'btn btn-success'
				]
 				// 'options' => [
 				// 	'label' => 'Save',
					// 'attr' => [
					// 	'class' => 'btn btn-primary'
					// ]
 				// ],
			]);
			// ->add('clear', 'reset', [
			// 	'label' => 'Reseteaza',
			// 	'attr' => ['class' => 'btn btn-default']
			// ]);
	}
}
