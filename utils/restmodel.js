'use strict';

angular.module( 'js.restModel', [
])

.factory( 'RestModel', function( $http, $rootScope ){
	var self = this;

	var Model = function( data, promise ){
//		angular.extend( this, data );
		var promise;
		Model.prototype.getPromise = function(){
			return promise;
		}
		Model.prototype.setPromise = function( prom ){
			promise = prom;
		}
	};

	self.request = function( options, model ){
		$rootScope.$broadcast( 'restModelReqStart' );
		options.url += options.verb ? '/' + options.verb : '';

		var httpReq = function( options ) {
			return $http( options )
			.success( function( data, status, headers, config ){
				angular.extend( model, data );
			})
			.finally( function(){
				$rootScope.$broadcast( 'restModelReqStop' );
			});
		}
		var httpCall;

		if ( replaceRefs ){
			var deferred = $q.defer();
			options.beforeRequest( model ).getPromise().then( function( data ){
				httpCall = httpReq( options );
				httpCall.then( function( data){
					deferred.resolve( data );
				});
			});
			httpCall = deferred.promise;
		}
		else {
			httpCall = httpReq( options );
		}


		model.setPromise( httpCall );
//		model = new Model( {}, httpCall );
		return model;
	}

	var defaultActions = {
		update: {
			method: 'post',
		}
	}

	var buildActions = function( url, model, actions ){
		angular.forEach( actions, function( value, key ){
			Model.prototype[ key ] = function( params ){
				var options = value;
				options.url = url;
				options.data = model;
				options.params = params;
				return self.request( options, model );
			}
		});
		return model;
	}

	return function( aUrl, actions, replaceRefs ) {
		var url = aUrl;
		var model = new Model();
		var thisActions = {};

		angular.extend( thisActions, defaultActions, actions );
		buildActions( url, model, thisActions );

		return {
			get: function( what ) {
				model = self.request({
					url: url,
					method: 'get',
					params: what,
					verb: ''
				}, buildActions( url, new Model(), thisActions ) );
				return model;
			},

			create: function( what ) {
				model = self.request({
					url: url,
					method: 'post',
					data: what,
					verb: 'create'
				}, model );
				return model;
			}
		}
	}
});
