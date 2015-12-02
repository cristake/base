<?php

function createUser($overrides = [])
{
	return factory(App\Models\User::class)->create($overrides);
}