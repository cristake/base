<!-- NUME -->
<div class="form-group {{ $errors->first('name', 'has-error') }}">
	{!! Form::label('name', 'Nume', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::text('name', null,  ['class' => 'form-control', 'placeholder' => 'Nume', 'autofocus']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Nume si prenume</div>
		</small>
	</div>
</div>

<!-- EMAIL -->
<div class="form-group {{ $errors->first('email', 'has-error') }}">
	{!! Form::label('email', 'Email', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::text('email', null,  ['class' => 'form-control', 'placeholder' => 'Email']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Adresa de email</div>
		</small>
	</div>
</div>

<!-- ROLES -->
@can('edit_users')
	<div class="form-group {{ $errors->first('role', 'has-error') }}">
		{!! Form::label('role', 'Roluri', ['class' => 'control-label col-sm-2']) !!}
		<div class="col-sm-6">
			{!! Form::select('role', ['' => 'Selecteaza rol'] + $roles, (isset($user) and count($user->roles)) ? $user->roles->first()->id : null,  ['class' => 'form-control']) !!}
		</div>
		<div class="col-sm-4">
			<small>
				<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
				<div class="col-md-10">Selecteaza un rol pentru utilizator</div>
			</small>
		</div>
	</div>
@else
	{!! Form::hidden('role', (isset($user) and count($user->roles)) ? $user->roles->first()->id : null,  ['class' => 'form-control', 'readonly']) !!}
@endcan

<!-- PAROLA -->
<div class="form-group {{ $errors->first('password', 'has-error') }}">
	{!! Form::label('name', 'Parola', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::password('password', ['class' => 'form-control', 'placeholder' => 'Parola']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Parola (minim 6 caractere)</div>
		</small>
	</div>
</div>

<!-- CONFIRMARE PAROLA -->
<div class="form-group {{ $errors->first('password', 'has-error') }}">
	{!! Form::label('password', 'Confirmare parola', ['class' => 'control-label col-sm-2']) !!}
	<div class="col-sm-6">
		{!! Form::password('password_confirmation', ['class' => 'form-control', 'placeholder' => 'Confirmare parola']) !!}
	</div>
	<div class="col-sm-4">
		<small>
			<div class="col-md-1"><i class="fa fa-exclamation-triangle icon-default"></i></div>
			<div class="col-md-10">Rescrie parola</div>
		</small>
	</div>
</div>

<div class="form-group">
	<div class="col-md-offset-2 col-md-9">
		{!! Form::token() !!}
		{!! Form::submit('Salveaza', ['class' => 'btn btn-primary']) !!}
	</div>
</div>