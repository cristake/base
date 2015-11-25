<ul class="dropdown-menu">
    @foreach($pages as $item)
        @if($item->parent_id == $id)
            <li class="dropdown">
            	<a href="{{ url($page->slug . '/' . $item->slug) }}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{!! $item->name !!}  {{-- $item->hasChildren($item->id) ? '<span class="caret"></span>' : '' --}}</a>
            	{{-- @include('_frontend.home.submenus', ['id' => $item->id]) --}}
        	</li>
        @endif
    @endforeach
</ul>