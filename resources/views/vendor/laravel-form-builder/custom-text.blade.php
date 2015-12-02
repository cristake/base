@if ($showLabel && $showField)
    @if ($options['wrapper'] !== false)
    <div <?= $options['wrapperAttrs'] ?> >
    @endif
@endif

@if ($showLabel && $options['label'] !== false)
    {!! Form::label($name, $options['label'], $options['label_attr']) !!}
@endif

@if ($showField)
	<div class="col-sm-6">
	    {!! Form::input($type, $name, $options['value'], $options['attr']) !!}
	</div>

	<div class="col-sm-4">	
	    @include('vendor.laravel-form-builder.help_block')
	</div>
@endif

@include('vendor.laravel-form-builder.errors')

@if ($showLabel && $showField)
    @if ($options['wrapper'] !== false)
    </div>
    @endif
@endif
