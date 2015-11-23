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
				<small class="pull-right">Administrare utilizatori</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">
					{{-- @can('create_users') --}}
						{!! HTML::decode( link_to_route('users_create', '<i class="fa fa-plus"></i> Adauga utilizator nou', [], ['class' => 'btn btn-primary', 'title' => 'Adauga utilizator nou', 'id' => 'toolbar']) ) !!}
					{{-- @endcan --}}

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
			var mark_url = "{!! route('mark_users', [':id', ':status']) !!}";
			mark_url = mark_url.replace(':id', row.id);
			mark_url = mark_url.replace(':status', row.active == true ? 0 : 1);

			var active = '<a href="'+mark_url+'" class="btn btn-sm btn-warning" title="Dezactiveaza utilizator"><i class="fa fa-pause" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dezactiveaza utilizator"></i>&nbsp;Activ</a> ';
			var inactive = '<a href="'+mark_url+'" class="btn btn-sm btn-success" title="Activeaza utilizator"><i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="" data-original-title="Activeaza utilizator"></i>&nbsp;Inactiv</a> ';

			if( row.active )
				return [active].join('');

			return [inactive].join('');
		}

		function ActionsFormatter(index, row)
		{
			var edit_url = "{!! route('users_edit', ':id') !!}";
			edit_url = edit_url.replace(':id', row.id);

			var destroy_url = "{!! route('users_destroy', ':id') !!}";
			destroy_url = destroy_url.replace(':id', row.id);

			var edit = '<a href="'+edit_url+'" class="btn btn-sm btn-primary" title="Editeaza utilizator"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editeaza utilizator"></i></a> ';

			var destroy = '<a data-confirm="Esti sigur?" href="'+destroy_url+'" class="btn btn-sm btn-danger" title="Sterge utilizator"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sterge utilizator"></i></a> ';

			return [edit, destroy].join('');
		}
	</script>
@stop