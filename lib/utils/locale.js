'use strict';

/* Locale Module */

angular.module('jsLib.locale', [

])

.provider('Locale', function() {
	var locale = '';
	var path = '';
	var locales;// = {};
	var httpObj;

	this.setLocale = function( alocale ) {
		locale = alocale;
	};

	this.setLocalePath = function( locPath ) {
		path = locPath;
	};

	function loadLocale(){
		if (locales) return;
		//TODO: Make it async!!!
		$.ajax( path + locale + '.json', {
			async: false,
			dataType: "json",
			success: function( data, status, headers, config ){
				locales = data;
			},
			error: function( data, status, headers, config ){
				console.error('Locale file "' + path + locale + '.json" not found');
			}
		});
	}

	this.getKey = function( key ){
		return eval( 'locales.' + key );
	};

	this.$get = function(){
		loadLocale();
		return {
			localize: this.getKey,
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
