'use strict';

/* ValidateTooltip Module */

angular.module('jsWidgets.validateTooltip', [
	'jsLib.sprintf',
	'jsLib.emailValidator',
	'jsWidgets.missmatch'
])

.directive( 'jswValidateTooltip', function( sprintfFilter, emailValidatorFilter ){

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
					return controller.$isEmpty(modelValue) || emailValidatorFilter(modelValue);
				};
			}

			element.on('blur',function(){
				if (controller.$invalid && controller.$viewValue){
					element.tooltip('show');
				}
				else {
					element.tooltip('hide');
				}
			});
			
			// watch does not trigger if model is invalid!!!
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

