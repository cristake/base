@extends('_backend._layouts.master')

@section('meta')
    <title>Adaugare sectiune noua</title>

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
				Adaugare sectiune noua
				{!! HTML::decode( link_to_route('sections', '<i class="fa fa-arrow-left"></i> Inapoi', $page->id, ['class' => 'btn btn-primary pull-right']) ) !!}
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-body">

					<!-- Form Display -->
					{!! Form::open(['route' => ['sections_store', $page->id], 'class' => 'form-horizontal', 'method' => 'POST']) !!}
						@include('_backend.sections.includes.section-form')
					{!! Form::close() !!}

				</div><!--/.panel-body-->
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop