@extends('_backend._layouts.master')

@section('meta')
    <title>Page Title</title>

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
				{!! ucfirst( last( Request::segments() ) ) !!}
				<small class="pull-right">Administrare ........</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">
					{{-- @can('create_roles') --}}
						{!! HTML::decode( link_to_route('roles_create', '<i class="fa fa-plus"></i> Adauga ...... nou', [], ['class' => 'btn btn-info', 'title' => 'Adauga ...... nou', 'id' => 'toolbar']) ) !!}
					{{-- @endcan --}}

					{{-- @include('_backend.roles.includes.roles-table') --}}

				</div>
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop