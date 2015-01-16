'use strict';

/* Missmatch Module */

angular.module('jsWidgets.missmatch', [
])

.directive( 'jswMissmatch', function(){
	return {
		require: 'ngModel',
		scope: {
			jswMissmatch: '='
		},
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {

			scope.$watch('jswMissmatch', function(){
				controller.$validate();
			});
			
			controller.$validators.jswMissmatch = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				return scope.jswMissmatch === value;
			};
		}
	};
});
