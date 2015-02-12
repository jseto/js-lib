'use strict';

var fs = require('fs');
var bower = JSON.parse( fs.readFileSync( './.bowerrc', 'utf8' ) );

var basePath = __dirname;
var path = {
	base: basePath,
	client: basePath + '/demo/',
	server: basePath + '/demo/',
	test: basePath + '/test/',
	lib: basePath + '/lib/',
	bower: basePath + '/' + bower.directory + '/',
	docs: basePath + '/docs/',
	coverage: basePath + '/coverage/'
};

module.exports = {
	port: 3000,
	path: path,
	watch: {
		servedFiles: [
			path.client + '*.js',
			path.client + '*.html',
			path.client + '*.css',
			path.lib + '**/*.js',
			path.lib + '**/*.html',
			path.lib + '**/*.css'
		],
		docFiles: [
			path.lib + '**/*.js'
		]
	},
	test:{
		unit:{
			files : [
				path.bower + 'jquery/dist/jquery.js',
				path.bower + 'bootstrap/dist/js/bootstrap.js',
				path.bower + 'angular/angular.js',
				path.bower + 'angular-mocks/angular-mocks.js',
				path.bower + 'angular-messages/angular-messages.js',
				path.bower + 'jseto-bootstrap-datepicker/js/bootstrap-datepicker.js',
				path.test + '/**/*.js',
				path.lib + '/**/*.js',
				{ pattern: 'demo/locale/*.json', watched: true, served: true, included: false},
				path.test + '/**/*.html'
			]
		},
		e2e: {
			files: [
				path.test + '**/*e2e-spec.js'
			]
		}
	}
};