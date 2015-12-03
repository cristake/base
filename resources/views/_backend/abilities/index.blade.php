@extends('_backend._layouts.master')

@section('meta')
    <title>Abilitati</title>

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
				<small class="pull-right">Administrare abilitati</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">
					{{-- @can('create_abilities') --}}
						{!! HTML::decode( link_to_route('abilities_create', '<i class="fa fa-plus"></i> Adauga abilitate noua', [], ['class' => 'btn btn-info', 'title' => 'Adauga abilitate noua', 'id' => 'toolbar']) ) !!}
					{{-- @endcan --}}

					@include('_backend.abilities.includes.abilities-table')

				</div>
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end')
	<script>
		var $table = $('#table');

		$table.bootstrapTable({data: abilities});

		function ActionsFormatter(index, row)
		{
			var edit_url = "{!! route('abilities_edit', ':id') !!}";
			edit_url = edit_url.replace(':id', row.id);

			var destroy_url = "{!! route('abilities_destroy', ':id') !!}";
			destroy_url = destroy_url.replace(':id', row.id);

			var restore_url = "{!! route('abilities_restore', ':id') !!}"; 
			restore_url = restore_url.replace(':id', row.id);

			var forceDelete_url = "{!! route('abilities_forceDelete', ':id') !!}";
			forceDelete_url = forceDelete_url.replace(':id', row.id);

			var edit = '<a href="'+edit_url+'" id="edit" class="btn btn-info" title="Editeaza"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editeaza"></i></a> ';

			var destroy = '<a data-confirm="Esti sigur?" href="'+destroy_url+'" id="destroy" class="btn btn-danger" title="Sterge"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sterge"></i></a> ';

			var restore = '<a href="'+restore_url+'" class="btn btn-success" title="Restaureaza"><i class="fa fa-hdd-o" data-toggle="tooltip" data-placement="top" title="" data-original-title="Restaureaza"></i></a> ';

			var forceDelete = '<a data-confirm="Esti sigur?" href="'+forceDelete_url+'" class="btn btn-danger" title="Sterge definitiv"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sterge definitiv"></i></a> ';

			if( row.deleted_at )
				return [restore, forceDelete].join('');
			else
				return [edit, destroy].join('');
		}
	</script>
@stop