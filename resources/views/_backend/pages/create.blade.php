@extends('_backend._layouts.master')

@section('meta')
    <title>Adaugare pagina noua</title>

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
				Adaugare pagina noua
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
					{!! Form::open(['route' => 'pages_store', 'class' => 'form-horizontal', 'method' => 'POST']) !!}
						@include('_backend.pages.includes.page-form')
					{!! Form::close() !!}

				</div><!--/.panel-body-->
			</div>
		</div>
	</div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop