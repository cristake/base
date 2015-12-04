<!-- NUME -->
<div class="form-group">
	<div class="col-sm-2"><h4>Nume si Prenume</h4></div>
	<div class="col-sm-10"><h4>{!! $user->name !!}</h4></div>
</div>

<!-- EMAIL -->
<div class="form-group">
	<div class="col-sm-2"><h4>Adresa email</h4></div>
	<div class="col-sm-10"><h4>{!! $user->email !!}</h4></div>
</div>

<!-- ROLES -->
<div class="form-group">
	<div class="col-sm-2"><h4>Roluri</h4></div>
	<div class="col-sm-10"><h4>{!! implode(',', $user->roles()->lists('name')->all()) !!}</h4></div>
</div>

<!-- ABILITIES -->
<!-- <div class="form-group">
	<div class="col-sm-2"><h4>Abilitati</h4></div>
	<div class="col-sm-10"><h4>{!! implode(',', $user->abilities()->lists('name')->all()) !!}</h4></div>
</div> -->

<div class="col-md-offset-2 col-md-9">
	{!! HTML::decode( link_to_route('users_edit', '<i class="fa fa-pencil"></i> Editare', $user->id, ['class' => 'btn btn-primary']) ) !!}
</div>
