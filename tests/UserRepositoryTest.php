<?php

class UserRepositoryTest extends TestCase
{
    public function __construct()
    {
        $this->user = Mockery::mock('App\Models\User');
        $this->model = Mockery::mock('Eloquent');
    }

    /** @test */
    public function it_lists_all_users()
    {
        $this->model->shouldReceive('getAll')->andReturn('foo');

        $repository = new App\Repositories\User\DbUserRepository($this->user);

        $this->assertEquals('foo', $repository->loadByUserId($user_id));

        // $repo = Mockery::mock("App\Http\Repositories\UserRepository"); //Mock the UserRepository object

        // $users = $repo->shouldReceive("getAll")->andReturn([]); //tell the mocked object that you expect from him this that getPlayers() method will be called and it will return an empty array

        // $this->assertTrue([],$users);
    }
}
