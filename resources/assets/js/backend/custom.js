////////////////////////////
// Menu utilizatori collapse
////////////////////////////
$(document).ready(function() {

	var utilizatori = $.cookie('utilizatori');
	var utilizatori_icon = $(this).find('#utilizatoriCollapse i:first');

	$('ul.nav li.parent a#utilizatoriCollapse').click(function() {

		// $(this).find('em:first').toggleClass("fa-chevron-down");
		utilizatori_icon.toggleClass("fa-chevron-down");

		if(utilizatori != null) {
			$.removeCookie('utilizatori', { path: '/' });
		} else {
			$.cookie('utilizatori', 'collapsed', { expires: 7, path: '/' });
		}
	});

	utilizatori_icon.addClass("fa-chevron-right");
	
	if(utilizatori != null) {
		utilizatori_icon.addClass("fa-chevron-right");
	} else {
		utilizatori_icon.addClass("fa-chevron-down");
	}
});