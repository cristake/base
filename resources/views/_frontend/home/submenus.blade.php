<ul class="dropdown-menu">
    @foreach($pages as $item)
        @if($item->parent_id == $id)
            <li>
            	<a href="#">{!! $page->name !!}</span></a>
            	{{-- @include('_frontend.home.submenus', ['id' => $item->id]) --}}
        	</li>
        @endif
    @endforeach
</ul>