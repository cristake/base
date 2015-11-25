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
				<small class="pull-right">Administrare utilizatori</small>
	        </h2>
	    </div>
	</div>
	<!-- End page header -->

@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop