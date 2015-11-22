@extends('_backend._layouts.master')

@section('meta')
    <title>Utilizatori</title>

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
				@can('create_users')
					{!! HTML::decode( link_to_route('users_create', '<i class="fa fa-plus"></i>', [], ['class' => 'btn btn-primary', 'title' => 'Adauga']) ) !!}
				@endcan
				<small class="pull-right">Administrare utilizatori</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">

					@include('_backend.users.includes.users-table')

				</div>
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end')
	<script>
		function StatusFormatter(index, row)
		{
			if( row.active )
				return 'active';

			return 'inactive';
		}
	</script>
@stop