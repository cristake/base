<!-- NUME -->
@foreach(['ro', 'en'] as $locale)
	<div class="form-group {{ $errors->first(sprintf('name[%s]', $locale), 'has-error') }}">
		{!! Form::label(sprintf('name[%s]', $locale), sprintf('Denumire (%s)', $locale), ['class' => 'control-label col-sm-2']) !!}
		<div class="col-sm-5">
			{!! Form::text(sprintf('name[%s]', $locale), null,  ['class' => 'form-control', 'placeholder' => sprintf('Denumire (%s)', $locale), 'autofocus']) !!}
		</div>
		<div class="col-sm-5">
			<small>
				<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
				<div class="col-md-10">Denumire pagina</div>
			</small>
		</div>
	</div>
@endforeach

<!-- PARENT -->
<div class="form-group {{ $errors->first('parent_id', 'has-error') }}">
	{!! Form::label('parent_id', 'Pagina principala', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-5">
		{!! Form::select('parent_id', ['' => 'Selecteaza o pagina'] + ( isset($page->id) ? $pages->except([$page->id])->lists('name', 'id')->all() : $pages->lists('name', 'id')->all() ), null, ['class' => 'form-control']) !!}
	</div>
	<div class="col-sm-5">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Daca vrei ca aceasta pagina sa fie un submeniu, selecteaza din lista o pagina principala</div>
		</small>
	</div>
</div>

<div class="form-group">
	<div class="col-md-offset-2 col-md-9">
		{!! Form::token() !!}
		{!! Form::submit('Salveaza', ['class' => 'btn btn-primary']) !!}
	</div>
</div>