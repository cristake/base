var elixir = require('laravel-elixir');

elixir(function(mix) {
	mix
        // Copy webfont files
        .copy('node_modules/font-awesome/fonts', 'public/build/fonts/font-awesome')
        .copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/build/fonts/bootstrap')

		// Copy Bootstrap Files
		.copy('node_modules/bootstrap-sass/assets/stylesheets/bootstrap', 'resources/assets/sass/vendor/bootstrap')
		.copy('node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss', 'resources/assets/sass/vendor/_bootstrap.scss')
		.copy('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'resources/assets/js/vendor/bootstrap.js')

        // Copy bootstrap-tables files
        .copy('node_modules/bootstrap-table/dist/bootstrap-table.min.css', 'resources/assets/css/vendor')
        .copy('node_modules/bootstrap-table/dist/bootstrap-table.min.js', 'resources/assets/js/vendor')
        .copy('node_modules/bootstrap-table/dist/locale/bootstrap-table-ro-RO.min.js', 'resources/assets/js/vendor')

		// Copy Material Design Files
		.copy('node_modules/bootstrap-material-design/sass', 'resources/assets/sass/vendor/material')
		.copy('node_modules/bootstrap-material-design/scripts', 'resources/assets/js/vendor')

		// Copy Jquery Files
		.copy('node_modules/jquery/dist/jquery.js', 'resources/assets/js/vendor/jquery.js')
		.copy('node_modules/jquery.cookie/jquery.cookie.js', 'resources/assets/js/vendor/jquery.cookie.js')

		// Copy Sweetalert Files
		.copy('node_modules/sweetalert/sweetalert.css', 'resources/assets/css/vendor/sweetalert.css')
		.copy('node_modules/sweetalert/sweetalert.min.js', 'resources/assets/js/vendor/sweetalert.min.js')


		// Process back-end stylesheets
		.sass([
			'backend/main.scss',
		], 'resources/assets/css/backend/main.css')

		// Combine pre-processed back-end CSS files
		.styles([
			'vendor/bootstrap-table.min.css',
			'vendor/sweetalert.css',
			'backend/main.css',
		], 'public/css/backend.css')

		// Combine back-end scripts
		.scripts([
			'vendor/jquery.js',
			'vendor/bootstrap.js',
			'vendor/bootstrap-table.min.js',
			'vendor/bootstrap-table-ro-RO.min.js',
			'backend/vendor/lumino.glyphs.js',
			'vendor/jquery.cookie.js',
			'vendor/sweetalert.min.js',
			'backend/custom.js'
		], 'public/js/backend.js')

		// Apply version control
		.version([
			"public/css/backend.css", 
			"public/js/backend.js", 
		]);
});
