@if( Session::has('sweet_alert.alert') )
    <script>
		swal({
			text: "{!! Session::get('sweet_alert.text') !!}",
			type: "{!! Session::get('sweet_alert.type') !!}",
			title: "{!! Session::get('sweet_alert.title') !!}",
			confirmButtonText: "{!! Session::get('sweet_alert.confirmButtonText') !!}",
			showConfirmButton: "{!! Session::get('sweet_alert.showConfirmButton') !!}",
			allowOutsideClick: "{!! Session::get('sweet_alert.allowOutsideClick') !!}",
			timer: 5000
		});
    </script>
@endif

@if( Session::has('errors') )
	<script>
		swal({
			html: true,
			title: "Eroare!",
			text: "{!! implode('<br />', $errors->all()) !!}",
			type: "error",
			confirmButtonText: 'Inchide',
			showConfirmButton: true,
			allowOutsideClick: true,
			timer: 10000
		});
	</script>
@endif

