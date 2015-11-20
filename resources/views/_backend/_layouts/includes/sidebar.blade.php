<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
	<form role="search">
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Search">
		</div>
	</form>
	<ul class="nav menu">
		@include('_backend._layouts.includes.custom_menu', ['menus' => $sidebar->roots()])
	</ul>

</div><!--/.sidebar-->