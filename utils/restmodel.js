'use strict';

angular.module( 'jsLib.restModel', [
])

.factory( 'RestModel', ['$http', '$rootScope', function( $http, $rootScope ){
	var Model = function( data, promise ){
		angular.extend( this, data );
		Model.prototype.promise = promise;
	};
	var model;// = new Model();
	var url;

	var actions = {
		update: {
			method: 'post',
		}
	}

	var buildMethods = function( extActions ){
		angular.extend( actions, extActions );
		angular.forEach( actions, function( value, key ){
			if ( value.classMethod ){
				classMethods[ key ] = function( params, successCallback, errorCallback ){
					return request( value, params, successCallback, errorCallback );
				}
			}
			else {
				Model.prototype[ key ] = function( params, successCallback, errorCallback ){
					return request( value, params, successCallback, errorCallback );
				}
			}
		});
	}

	var request = function( extOptions, params, successCallback, errorCallback ){
		var options = {
			url: url,
			data: model,
			verb: '',		// added at the end of url
			params: params
		}
		
		$rootScope.$broadcast( 'restModelReqStart' );
		
		angular.extend( options, extOptions );
		options.url += options.verb ? '/' + options.verb : '';

		var http = $http( options );

		http.finally( function(){
			$rootScope.$broadcast( 'restModelReqStop' );
		});

		if ( options.method.toLowerCase() == 'get' ){
			http
			.success( function( data, status, headers, config ){
				angular.extend( model, new Model( data ) );
				if ( successCallback )
					successCallback( data, status, headers, config );
			})
			.error(function( data, status, headers, config ){
				if ( errorCallback )
					errorCallback( data, status, headers, config );
			});
			model = new Model({}, http );
			return model;
		}
		return http;
	}

	var classMethods = { // can be extended in buildMethods
		get: function( data, successCallback, errorCallback ) {
			return request({ 
				method: 'get',
				params: data 
			}, {}, successCallback, errorCallback ); //returns model
		},
		create: function( data, extOptions ) {
			var options = { 
				method: 'post',
				data: data,
				verb: 'create' 
			}
			angular.extend( options, extOptions );
			return request( options );
		},
	}

	return function( aUrl, actions ){
		url = aUrl;
		buildMethods( actions );
		return classMethods;
	}
}])

;
