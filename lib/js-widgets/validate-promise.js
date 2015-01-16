'use strict';

/* Missmatch Module */

angular.module('jsWidgets.validatePromise', [
])

.directive( 'jswValidatePromise', function(){
	return {
		scope: {
			jswValidatePromise: '&'
		},
		require: 'ngModel',
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {
			controller.$asyncValidators.jswValidatePromise = function( modelValue, viewValue ) {
				var value =  modelValue || viewValue || '';

				return scope.jswValidatePromise()( value );
			};
		}
	};
});
