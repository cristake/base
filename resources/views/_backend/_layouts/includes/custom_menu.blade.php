@foreach($menus as $menu)
	@if($menu->data['visible'] === true)
		<li@lm-attrs($menu) class="@if($menu->hasChildren()) parent @endif" @lm-endattrs>

			<a href="{!! $menu->url() !!}" 
				@if($menu->hasChildren()) data-toggle="collapse" id="{!! $menu->nickname !!}Collapse" @endif>
				{!! $menu->title !!}
			</a>
			
			@if($menu->hasChildren())				
				<ul class="children collapse 
					@if( !isset($_COOKIE[$menu->nickname]) ) in @endif" id="sub-menu-{!! $menu->nickname !!}">
					@include('_backend._layouts.includes.custom_menu', ['menus' => $menu->children()])
				</ul> 
			@endif
		</li>
	@endif
@endforeach