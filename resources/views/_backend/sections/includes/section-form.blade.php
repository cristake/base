<!-- CODE -->
<div class="form-group {{ $errors->first('code', 'has-error') }}">
	{!! Form::label('code', 'Cod', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::text('code', null,  ['class' => 'form-control', 'placeholder' => 'Cod', 'autofocus']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Cod sectiune</div>
		</small>
	</div>
</div>

<!-- TITLE -->
<div class="form-group {{ $errors->first('title', 'has-error') }}">
	{!! Form::label('title', 'Titlu', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::text('title', null,  ['class' => 'form-control', 'placeholder' => 'Titlu', 'autofocus']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Titlu sectiune</div>
		</small>
	</div>
</div>

<!-- PAGE -->
<div class="form-group {{ $errors->first('page_id', 'has-error') }}">
	{!! Form::label('page_id', 'Pagina principala', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::select('page_id', ['' => 'Selecteaza pagina'] + $pages->lists('name', 'id')->all(), $page->id, ['class' => 'form-control']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Alege pagina pentru aceasta sectiune</div>
		</small>
	</div>
</div>



<div class="form-group">
	<div class="col-md-offset-2 col-md-9">
		{!! Form::token() !!}
		{!! Form::submit('Salveaza', ['class' => 'btn btn-primary']) !!}
	</div>
</div>