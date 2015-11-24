////////////////////////////
// Menu continut collapse
////////////////////////////
$(document).ready(function() {

	var continut = $.cookie('continut');
	var continut_icon = $(this).find('#continutCollapse i:first');

	$('ul.nav li.parent a#continutCollapse').click(function() {

		// $(this).find('em:first').toggleClass("fa-chevron-down");
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
	var setari_icon = $(this).find('#setariCollapse i:first');

	$('ul.nav li.parent a#setariCollapse').click(function() {

		// $(this).find('em:first').toggleClass("fa-chevron-down");
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