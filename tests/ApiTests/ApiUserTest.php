<?php

use App\Models\User;

class ApiUserTest extends TestCase
{
    /** @test */
    public function it_displays_all_users()
    {
        $user = createUser();

    	$this->get('api/users')
        	->seeJson([
                    'name' => $user->name
                ]);
    }

    /** @test */
    public function it_creates_a_new_user()
    {
    	$user = createUser();

    	$response = $this->call('POST', 'api/users', $user->toArray());
    	$this->assertEquals(201, $response->status());
    }

    /** @test */
    public function it_displays_a_specific_user()
    {
        $user = createUser();

        $this->get( sprintf('api/users/%d', $user->id) )
        	->seeJson([
        			'name' => $user->name
        		]);
    }

    /** @test */
    public function it_updates_an_existing_user()
    {
    	$user = createUser();

    	$response = $this->call('PUT', sprintf('api/users/%d', $user->id), $user->toArray());
    	$this->assertEquals(200, $response->status());
    }

    /** @test */
    public function it_soft_deletes_an_existing_user()
    {
    	$user = createUser();

    	$response = $this->call('DELETE', sprintf('api/users/%d', $user->id));
    	$this->assertEquals(200, $response->status());
    }

    /** @test */
    public function it_restores_a_soft_deleted_user()
    {
    	$user = createUser();

    	$response = $this->call('GET', sprintf('api/users/%d/restore', $user->id));
    	$this->assertEquals(200, $response->status());
    }

    /** @test */
    public function it_force_deletes_an_existing_user()
    {
    	$user = createUser();

    	$response = $this->call('GET', sprintf('api/users/%d/forceDelete', $user->id));
    	$this->assertEquals(200, $response->status());
    }

}
