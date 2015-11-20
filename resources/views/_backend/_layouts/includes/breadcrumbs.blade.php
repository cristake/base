<!-- breadcrumb -->
<div class="row">
    <ol class="breadcrumb">
        <li><a href="{{ route('dashboard') }}"><svg class="glyph stroked home"><use xlink:href="#stroked-home"></use></svg></a></li>
        @foreach( array_except(Request::segments(), [0]) as $segment )
        	<li class="{{ last( Request::segments() ) == $segment ? 'active' : '' }}">{!! ucfirst( $segment ) !!}</li>
        @endforeach
    </ol>
</div><!--/.row-->