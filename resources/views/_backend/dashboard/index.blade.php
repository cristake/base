@extends('_backend._layouts.master')

@section('meta')
    <title>Dashboard</title>

    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
@stop

@section('before-styles-end') @stop
@section('after-styles-end') @stop

@section('content')
    <!-- page-header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Dashboard</h1>
        </div>
    </div><!--/.row-->

    <!-- widgets -->
    <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-3">
            <div class="panel panel-blue panel-widget ">
                <div class="row no-padding">
                    <div class="col-sm-3 col-lg-5 widget-left">
                        <svg class="glyph stroked bag"><use xlink:href="#stroked-bag"></use></svg>
                    </div>
                    <div class="col-sm-9 col-lg-7 widget-right">
                        <div class="large">120</div>
                        <div class="text-muted">New Orders</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-md-6 col-lg-3">
            <div class="panel panel-orange panel-widget">
                <div class="row no-padding">
                    <div class="col-sm-3 col-lg-5 widget-left">
                        <svg class="glyph stroked empty-message"><use xlink:href="#stroked-empty-message"></use></svg>
                    </div>
                    <div class="col-sm-9 col-lg-7 widget-right">
                        <div class="large">52</div>
                        <div class="text-muted">Comments</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-md-6 col-lg-3">
            <div class="panel panel-teal panel-widget">
                <div class="row no-padding">
                    <div class="col-sm-3 col-lg-5 widget-left">
                        <svg class="glyph stroked male-user"><use xlink:href="#stroked-male-user"></use></svg>
                    </div>
                    <div class="col-sm-9 col-lg-7 widget-right">
                        <div class="large">24</div>
                        <div class="text-muted">New Users</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-md-6 col-lg-3">
            <div class="panel panel-red panel-widget">
                <div class="row no-padding">
                    <div class="col-sm-3 col-lg-5 widget-left">
                        <svg class="glyph stroked app-window-with-content"><use xlink:href="#stroked-app-window-with-content"></use></svg>
                    </div>
                    <div class="col-sm-9 col-lg-7 widget-right">
                        <div class="large">25.2k</div>
                        <div class="text-muted">Page Views</div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--/.row-->
@stop

@section('before-scripts-end') @stop
@section('after-scripts-end') @stop