'use strict';

/* Missmatch Module */

angular.module('jsWidgets.missmatch', [
])

.directive( 'jswMissmatch', function(){
	return {
		require: 'ngModel',
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {
			controller.$validators.jswMissmatch = function(modelValue, viewValue) {
				if ( angular.isFunction( attrs.jswMissmatch ) ) {
					return attrs.jswMissmatch()();
				}
				else {
					return scope.$eval( attrs.jswMissmatch );
				}
			};
		}
	};
})
