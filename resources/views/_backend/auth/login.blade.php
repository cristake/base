@extends('_backend._layouts.master')

@section('meta')
	<title>Login</title>

	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="author" content="">
@stop

@section('before-styles-end') @stop
@section('after-styles-end') @stop

@section('login')
	{{-- <div class="row"> --}}
		<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
			<div class="login-panel panel panel-default">
				<div class="panel-heading">Log in</div>
				<div class="panel-body">

					{!! Form::open(['role' => 'form']) !!}
						<div class="form-group">
							{!! Form::input('email', 'email', old('email'), ['class' => 'form-control', 'id' => 'email', 'placeholder' => 'Email', 'autofocus']) !!}

						</div>

						<div class="form-group">
							{!! Form::input('password', 'password', null, ['class' => 'form-control', 'id' => 'password', 'placeholder' => 'Password']) !!}
						</div>

						<div class="checkbox">
							<label>
								{!! Form::checkbox('remember', 1, true) !!} Tine-ma minte
							</label>
						</div>

						{!! Form::submit('Login', ['class' => 'btn btn-primary', 'style' => 'margin-right:15px']) !!}
						{{-- <a href="{!! url('admin/login/facebook') !!}" class="btn btn-primary">Facebook Login</a> --}}
						{{-- <a href="{!! url('admin/login/twitter') !!}" class="btn btn-primary">Twitter Login</a> --}}
					{!! Form::close() !!}

				</div>
			</div>
		</div><!-- /.col-->
	{{-- </div> --}}
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop