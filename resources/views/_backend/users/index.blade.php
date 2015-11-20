@extends('_backend._layouts.master')

@section('meta')
    <title>Utilizatori</title>

    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
@stop

@section('before-styles-end') @stop
@section('after-styles-end')
	{!! HTML::style('_backend/css/bootstrap-table.css') !!}
@stop

@section('content')
	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-heading">Utilizatori</div>
				<div class="panel-body">
					@include('_backend.users.includes.users-table')
				</div>
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end')
	{!! HTML::script('_backend/js/bootstrap-table.js') !!}
@stop