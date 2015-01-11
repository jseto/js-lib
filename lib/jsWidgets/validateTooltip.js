'use strict';

/* ValidateTooltip Module */

angular.module('jsWidgets.validateTooltip', [
	'jsLib.sprintf'
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

.directive( 'jswValidateTooltip', function( sprintfFilter ){
	var EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
	return {
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, element, attrs, controller) {
			var messageErrors = attrs.jswValidateTooltip ? angular.fromJson(attrs.jswValidateTooltip) : '';
			
			function errorMsg( error ){
				var errorStr;

				angular.forEach( error, function(value, key){
					if (value) {
						errorStr = messageErrors[key];
					}	
				});

				if ( !errorStr ) {
					
					if ( attrs.ngPatternErrorMessage ){
						errorStr = attrs.ngPatternErrorMessage;
					}
					else {
						throw 'unknown validation error message';
					}
				}

				if ( error.minlength ){
					errorStr = sprintfFilter( errorStr, attrs.ngMinlength );
				}
				return errorStr;
			}

			element.tooltip({
				trigger: 'manual',
				placement: attrs.tooltipPlacement,
				container: 'form',
//				selector: '[jsw-validate-tooltip]',
				title: function(){
					return errorMsg(controller.$error);
				}
			});	

			if (controller.$validators.email) {
				controller.$validators.email = function(modelValue) {
					return controller.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
				};
			}

			// element.on('blur',function(){
			// 	console.log('blur',controller.$invalid);
			// 	if (controller.$invalid && controller.$viewValue){
			// 		element.tooltip('show');
			// 	}
			// 	else {
			// 		element.tooltip('hide');
			// 	}
			// });

			scope.$watch( attrs.ngModel, function(){
				if (controller.$invalid && controller.$viewValue){
					element.tooltip('show');
				}
				else {
					element.tooltip('hide');
				}
			});
		}
	};
});

