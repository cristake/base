@extends('_backend._layouts.master')

@section('meta')
    <title>Adaugare utilizator nou</title>

    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
@stop

@section('before-styles-end') @stop
@section('after-styles-end') @stop

@section('content')
	<!-- Start page header -->  
	<div class="row">
	    <div class="col-lg-12">
	        <h2 class="page-header" id="simple-msg">
				Adaugare utilizator nou
				{!! HTML::decode( link_to_route('users', '<i class="fa fa-arrow-left"></i> Inapoi', [], ['class' => 'btn btn-info pull-right']) ) !!}
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">

					<!-- Form Display -->
					{{-- {!! form($user_form) !!} --}}
					{!! Form::open(['route' => 'users_store', 'class' => 'form-horizontal', 'method' => 'POST']) !!}
						@include('_backend.users.includes.user-form')
					{!! Form::close() !!}

				</div><!--/.panel-body-->
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop