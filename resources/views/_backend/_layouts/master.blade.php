<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

		<!-- Custom title & meta for each page -->
		@yield('meta')

		<link rel="shortcut icon" href="{{ asset('favicon.ico') }}">

		<!-- Custom styles for this template -->
        @yield('before-styles-end')

		{!! HTML::style(elixir('css/backend.css')) !!}

        @yield('after-styles-end')

		{{-- <link href='//fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'> --}}

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>

	<body>

		<!-- Main layout -->
		@if(Auth::check())
			@include('_backend._layouts.includes.nav')
			@include('_backend._layouts.includes.sidebar')

			<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
				@include('_backend._layouts.includes.breadcrumbs')

				@yield('content')
			</div>
		@else
			@yield('login')
		@endif



		<!-- Footer layout -->
		@include('_backend._layouts.includes.footer')



		<!-- Scripts -->
		@yield('before-scripts-end')
		{!! HTML::script(elixir('js/backend.js')) !!}
		@yield('after-scripts-end')
		@include('sweet::alert')
	</body>

</html>