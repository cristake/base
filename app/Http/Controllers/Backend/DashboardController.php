<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class DashboardController extends Controller
{
	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		return view('_backend.dashboard.index');
	}

}