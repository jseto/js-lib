'use strict';

/* Locale Module */

angular.module('jsLib.locale', [

])

.provider('Locale', function() {
	var locale = '';
	var path = '';
	var locales = {};

	this.setLocale = function( alocale ) {
		locale = alocale;
	};

	this.setLocalePath = function( locPath ) {
		path = locPath;
	};

	this.loadLocale = function( http ){
		if ( locales.lenght ) return;

		locales.promise = http.get( path + locale + '.json' )
			.success( function( data ){
				angular.extend( locales, data );
			})
			.error( function(){
				console.error('Locale file "' + path + locale + '.json" not found');
			});
		return locales;

		// $.ajax( path + locale + '.json', {
		// 	async: false,
		// 	dataType: "json",
		// 	success: function( data, status, headers, config ){
		// 		locales = data;
		// 	},
		// 	error: function( data, status, headers, config ){
		// 		console.error('Locale file "' + path + locale + '.json" not found');
		// 	}
		// });
	};

	this.getKey = function( key ){
		return locales[ key ]; 
	};

	this.$get = function( $http ){
		var loc = this.loadLocale( $http );
		return {
			localize: this.getKey,
			getLocale: function(){ return loc; }
		};
	};
})

//.factory('Locale', function())

.filter('loc', function( Locale ){
	return function( key ) {
		return Locale.localize( key );
	};
})

;