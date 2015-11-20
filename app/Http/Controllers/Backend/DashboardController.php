<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\BaseController;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class DashboardController extends BaseController
{
	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		$users = $this->api->get('api/users');

		return view('_backend.dashboard.index', compact('users'));
	}

}