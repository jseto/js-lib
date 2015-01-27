'use strict';

angular.module('jsWidgets.uniqueUser', [
])

.directive( 'jswUniqueUser', function( $q ){
	return {
		scope: {
			jswUniqueUser: '&'
		},
		require: 'ngModel',
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {
			controller.$asyncValidators.jswUniqueUser = function( modelValue, viewValue ) {
				var value =  modelValue || viewValue || '';

				if ( !value ) return $q.reject('empty');

				return scope.jswUniqueUser()( value ).then(
						function resolved() {
							//username exists, this means validation fails
							return $q.reject('exists');
						},
						function rejected() {
							//hey! user does not exists, then validation is ok
							return true;
						});
			};
		}
	};
});
