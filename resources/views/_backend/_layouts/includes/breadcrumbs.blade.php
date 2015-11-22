<!-- breadcrumb -->
<div class="row">
    <ol class="breadcrumb">
        <li><a href="{{ route('dashboard') }}"><svg class="glyph stroked home"><use xlink:href="#stroked-home"></use></svg></a></li>
        @foreach( array_except(Request::segments(), [0]) as $segment )
        	@if( last( Request::segments() ) == $segment )
	        	<li class="active">{!! ucfirst( $segment ) !!}</li>
        	@else
        		<li><a href="{{ route( $segment ) }}">{{ ucfirst($segment) }}</a></li>
        	@endif
        @endforeach
    </ol>
</div><!--/.row-->