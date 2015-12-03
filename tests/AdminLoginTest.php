<?php

class AdminLoginTest extends TestCase
{
    /** @test */
    public function an_user_must_be_signed_in_to_view_the_dashboard()
    {
        $this->visit('admin')
            ->seePageIs('admin/login');
    }

    /** @test */
    public function a_registered_user_can_login_and_view_the_dashboard()
    {
        $this->visit('admin/login')
            ->type('cristianiosif@me.com', 'email')
            ->type('parola', 'password')
            ->press('Login')
            ->seePageIs('admin');
    }

    /** @test */
    // public function a_banned_user_cannot_login()
    // {
    //     $this->visit('admin/login')
    //         ->type('veronica.dragu@icloud.com', 'email')
    //         ->type('parola', 'password')
    //         ->press('Login')
    //         ->seePageIs('admin/login');
    // }

    /** @test */
    public function after_signing_in_an_user_can_view_the_dashboard()
    {
        $user = createUser();

        $this->be($user);

        $this->visit('admin')
            ->see('Dashboard');
    }

}