@extends('_backend._layouts.master')

@section('meta')
    <title>Pagini</title>

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
				<small class="pull-right">Administrare pagini</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">
					{{-- @can('create_pages') --}}
						{!! HTML::decode( link_to_route('pages_create', '<i class="fa fa-plus"></i> Adauga o pagina noua', [], ['class' => 'btn btn-info', 'title' => 'Adauga o pagina noua', 'id' => 'toolbar']) ) !!}
					{{-- @endcan --}}

					@include('_backend.pages.includes.pages-table')

				</div>
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end')
	<script>
		var $table = $('#table');

		$table.bootstrapTable({data: pages});
		console.log(pages);

		function ParentFormatter(index, row)
		{
			$.each(pages, function(index, page)
			{
				if(row.parent_id == page.id)
					parent = page.name;
				else if(row.parent_id == 0)
					parent = 'none';
			});

			return parent;
		}

		// function rowStyle(row, index)
		// {
		//     if ( row.deleted_at ) {
		//         return {
		//             classes: 'strikethrough warning'
		//         };
		//     }
		//     return {};
		// }

		function StatusFormatter(index, row)
		{
			var mark_url = "{!! route('mark_pages', [':id', ':status']) !!}";
			mark_url = mark_url.replace(':id', row.id);
			mark_url = mark_url.replace(':status', row.status == true ? 0 : 1);

			var active = '<a href="'+mark_url+'" class="btn btn-warning" title="Dezactiveaza pagina"><i class="fa fa-pause" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dezactiveaza pagina"></i>&nbsp;Activa</a> ';

			var inactive = '<a href="'+mark_url+'" class="btn btn-success" title="Activeaza pagina"><i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="" data-original-title="Activeaza pagina"></i>&nbsp;Inactiva</a> ';

			if( row.status )
				return [active].join('');

			if( row.deleted_at )
				return '';

			return [inactive].join('');
		}

		function SectionsFormatter(index, row)
		{
			var index_url = "{!! route('sections', ':page_id') !!}";
			index_url = index_url.replace(':page_id', row.id);

			var create_url = "{!! route('sections_create', ':page_id') !!}";
			create_url = create_url.replace(':page_id', row.id);

			var sections = '<a href="'+index_url+'" class="btn btn-primary" title="Vezi submeniurile"><i class="fa fa-list" data-toggle="tooltip" data-placement="top" title="" data-original-title="Vezi submeniurile"></i></a> ';

			var create = '<a href="'+create_url+'" class="btn btn-success" title="Adauga submeniuri"><i class="fa fa-plus" data-toggle="tooltip" data-placement="top" title="" data-original-title="Adauga submeniuri"></i></a> ';

			if( row.sections.length > 0 )
				return [sections, create].join('');
			else
				return [create].join('');
		}

		function ActionsFormatter(index, row)
		{
			var edit_url = "{!! route('pages_edit', ':id') !!}";
			edit_url = edit_url.replace(':id', row.id);

			var destroy_url = "{!! route('pages_destroy', ':id') !!}";
			destroy_url = destroy_url.replace(':id', row.id);

			var restore_url = "{!! route('pages_restore', ':id') !!}";
			restore_url = restore_url.replace(':id', row.id);

			var forceDelete_url = "{!! route('pages_forceDelete', ':id') !!}";
			forceDelete_url = forceDelete_url.replace(':id', row.id);

			var edit = '<a href="'+edit_url+'" class="btn btn-info" title="Editeaza pagina"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editeaza pagina"></i></a> ';

			var destroy = '<a data-confirm="Esti sigur?" href="'+destroy_url+'" class="btn btn-danger" title="Sterge pagina"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sterge pagina"></i></a> ';

			var restore = '<a href="'+restore_url+'" class="btn btn-success" title="Restaureaza pagina"><i class="fa fa-check" data-toggle="tooltip" data-placement="top" title="" data-original-title="Restaureaza pagina"></i></a> ';

			var forceDelete = '<a data-confirm="Esti sigur?" href="'+forceDelete_url+'" class="btn btn-danger" title="Sterge definitiv pagina"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sterge definitiv pagina"></i></a> ';

			if( row.deleted_at )
				return [restore, forceDelete].join('');
			else
				return [edit, destroy].join('');
		}
	</script>
@stop