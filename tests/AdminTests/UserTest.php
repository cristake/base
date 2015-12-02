<?php

class UserTest extends TestCase
{
    /** @test */
    public function it_shows_all_the_users()
    {
    	$user = createUser();

    	$this->be($user);

        $this->visit('admin/users')
        	->see($user->name);
    }

    /** @test */
    public function it_can_edit_an_user_making_a_put_request_to_the_api()
    {
    	$user = createUser();

    	$this->be($user);

    	$this->visit(sprintf('admin/users/%d/edit', $user->id))
    		->type('Name', 'name')
    		->type('user@example.com', 'email')
    		->press('Salveaza')
    		->call('PUT', sprintf('api/users/%d', $user->id));
    }

    /** @test */
    /**public function it_can_soft_delete_an_user_making_a_get_request_to_the_api()
    {
    	$user = factory(User::class)->create();

    	$this->be($user);

    	$this->visit('admin/users')
    		->click('#destroy')
    		->call('DELETE', sprintf('api/users/%d', $user->id));
    }*/

}
