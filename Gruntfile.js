var fs = require('fs');

module.exports = function( grunt ) {

	// Variables
	var colorScheme = {},
	  theme = {};

	var themeSettings = {
		bootstrap: {
			id: 'bt_bootstrap',
			baseDir: 'css/bootstrap/',
			dest: 'css/bootstrap/bt_bootstrap.css',
			src: 'third_party/bootstrap/less/bt_bootstrap/bt_bootstrap.less'
		}
	};

	var colorSchemeSettings = {
		bootstrap: {
			dir: 'third_party/bootstrap/less/bt_bootstrap/color_scheme/variables/',
			dest: 'third_party/bootstrap/less/bt_bootstrap/color_scheme/',
			src: function( dir, path ) {
				return [ dir + '../../color_header.less', dir + path, dir + '../../color_footer.less' ];
			},
			filter: function( path ) {
				return path.substring( 0, path.indexOf('_') ) + '.less';
			}
		}
	};

	// Read directories
	// Setting up color themes
	for ( var prop in colorSchemeSettings ) {
		fs.readdirSync( colorSchemeSettings[ prop ]['dir'] ).forEach( function( path ) {
			if( path.indexOf('.less') > -1 ) {

				var fn = ( typeof colorSchemeSettings[ prop ]['filter'] === 'function' ) ?
				  colorSchemeSettings[ prop ]['filter']( path ) : 
				  path;

				var dest = colorSchemeSettings[ prop ]['dest'] + fn,
				  src = colorSchemeSettings[ prop ]['src']( colorSchemeSettings[ prop ]['dir'], path ),
				  themeDest = themeSettings[ prop ]['baseDir'] + themeSettings[ prop ]['id'] + 
				    '_' + fn.substring( 0, fn.lastIndexOf('.') ) + '.css';

				colorScheme[ prop + '_' + path ] = { files: [ { src: src.slice(0), dest: dest } ] };
				theme[ prop + '_' + path ] = { files: [ { src: dest, dest: themeDest } ] };
			}
		});
	}

	// Setting up general themes
	for ( var prop in themeSettings ) {
		var dest = themeSettings[ prop ]['dest'],
		  src = themeSettings[ prop ]['src'],
		  id = themeSettings[prop]['id'];

		theme[ id ]	= { files: [ { src: src, dest: dest } ] };
	}

	// Grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/**!\n' +
		  '* BlogToc v<%= pkg.version %>\n' +
		  '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
		  '* Licensed under the <%= _.pluck(pkg.licenses, "name").join(", ") %>\n' +
		  '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
		  '* \n' +
		  '* A javascript plugin to make table of contents for blogspot using Blogger Feed API.\n' + 
		  '*/\n',
		clean: {
			release: ['<%= pkg.name %>.js']
		},
		concat: {
			release: {
				src: 'src/<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.js'
			},
			color: colorScheme
		},
		less: {
			production: theme
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			build: {
				expand: true,
				src: '<%= pkg.name %>.js',
				ext: '.min.js'
			}
		},
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [ '<%= pkg.name %>.js' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask( 'default', [ 'clean', 'concat', 'usebanner', 'less', 'uglify' ] );
}