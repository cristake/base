<!-- DENUMIRE -->
<div class="form-group {{ $errors->first('name', 'has-error') }}">
	{!! Form::label('name', 'Denumire', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::text('name', null,  ['class' => 'form-control', 'placeholder' => 'Denumire', 'autofocus']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Denumire rol</div>
		</small>
	</div>
</div>

<!-- ROLES -->
<div class="form-group {{ $errors->first('role', 'has-error') }}">
	{!! Form::label('role', 'Roluri', ['class' => 'control-label col-sm-2']) !!}

	@foreach($roles as $role)
		<div class="col-sm-2">
			{!! Form::checkbox('roles[]', $role->id, (isset($ability) && $ability->belongsToRole($role->id) ? true : false ), ['class' => 'field']) !!}
			{!! Form::label($role->name, ucfirst($role->name), ['class' => 'control-label']) !!}
		</div>
	@endforeach

	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Selecteaza rolurile care pot avea aceasta abilitate</div>
		</small>
	</div>
</div>

<div class="form-group">
	<div class="col-md-offset-2 col-md-9">
		{!! Form::token() !!}
		{!! Form::submit('Salveaza', ['class' => 'btn btn-primary']) !!}
	</div>
</div>