////////////////////////////
// Menu continut collapse
////////////////////////////
$(document).ready(function() {

	var continut = $.cookie('continut');
	var continut_icon = $(this).find('#continutCollapse em:first');

	$('ul.nav li.parent a#continutCollapse').click(function() {

		continut_icon.toggleClass("fa-chevron-down");

		if(continut != null) {
			$.removeCookie('continut', { path: '/' });
		} else {
			$.cookie('continut', 'collapsed', { expires: 7, path: '/' });
		}
	});

	continut_icon.addClass("fa-chevron-right");
	
	if(continut != null) {
		continut_icon.addClass("fa-chevron-right");
	} else {
		continut_icon.addClass("fa-chevron-down");
	}
});

////////////////////////////
// Menu setari collapse
////////////////////////////
$(document).ready(function() {

	var setari = $.cookie('setari');
	var setari_icon = $(this).find('#setariCollapse em:first');

	$('ul.nav li.parent a#setariCollapse').click(function() {

		setari_icon.toggleClass("fa-chevron-down");

		if(setari != null) {
			$.removeCookie('setari', { path: '/' });
		} else {
			$.cookie('setari', 'collapsed', { expires: 7, path: '/' });
		}
	});

	setari_icon.addClass("fa-chevron-right");
	
	if(setari != null) {
		setari_icon.addClass("fa-chevron-right");
	} else {
		setari_icon.addClass("fa-chevron-down");
	}
});


////////////////////////////
// Data confirm SweetAlert
//////////////////////////// 
$(function() {
	// Confirm deleting resources
	$("a[data-confirm]").click(function(e) {
		e.preventDefault();
		var link = this;
		swal({
            title: "Esti sigur?",
            text: "Inregistrarile sterse nu vor putea fi recuperate!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Da, sunt sigur!',
            cancelButtonText: "Nu, anuleaza!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm) {
  			if (isConfirm) {
				// swal({
				// 	title: "Success!",
				// 	text: "Inregistrarea a fost stearsa!",
				// 	type: "success",
				// });
  				window.location = link.href;
  			}
			else {
				swal("Anulat", "Inregistrarea nu a fost stearsa!", "error");
			}
        });
	});
});


////////////////////////////
// Tooltip
////////////////////////////
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

////////////////////////////
// Mesaje de alerta
////////////////////////////
$(function() {
    setTimeout(function() {
		$('.alert').delay(5000).slideUp('slow');
    }, 3000);
});