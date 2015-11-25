@extends('_backend._layouts.master')

@section('meta')
    <title>Editare pagina {!! $page->name !!}</title>

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
				Editare pagina "{!! $page->name !!}"
				{!! HTML::decode( link_to_route('pages', '<i class="fa fa-arrow-left"></i> Inapoi', [], ['class' => 'btn btn-primary pull-right']) ) !!}
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">

					<!-- Form Display -->
					{!! Form::model($page, ['route' => ['pages_update', $page->id], 'class' => 'form-horizontal', 'method' => 'PUT']) !!}
						@include('_backend.pages.includes.page-form')
					{!! Form::close() !!}

				</div><!--/.panel-body-->
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop