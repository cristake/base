<!-- breadcrumb -->
<div class="row">
    <ol class="breadcrumb">
        <li><a href="{{ route('dashboard') }}"><svg class="glyph stroked home"><use xlink:href="#stroked-home"></use></svg></a></li>
        <li class="active">{!! ucfirst( Request::segment(2) ) !!}</li>
    </ol>
</div><!--/.row-->