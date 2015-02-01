'use strict';

angular.module('jsLib.utils.emailValidator',[
])

.factory('emailValidator', function(){
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;: @\"]+(\.[^<>()[\]\\.,;: @\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return function ( value ){
    	return EMAIL_REGEXP.test( value );
    };
})

.directive('jswEmail', function( emailValidator ){
	return {
		require: 'ngModel',
		scope: {
		},
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {
			controller.$validators.email = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				return emailValidator( value );
			};
		}
	};
});
