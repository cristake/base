<?php

use App\Models\User;

class AuthTest extends TestCase
{
    /** @test */
    public function a_user_must_be_signed_in_to_view_the_dashboard()
    {
        $this->visit('admin')
            ->seePageIs('admin/login');
    }

    /** @test */
    public function a_signed_in_user_can_view_the_dashboard()
    {
        $user = factory(User::class)->create();

        $this->be($user);

        $this->visit('admin')
            ->see('Dashboard');
    }



}
