'use strict';

/* ValidateTooltip Module */

angular.module('jsWidgets.validateTooltip', [
])

.directive( 'jswValidateTooltip', function(){
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
					errorStr = printf( errorStr, scope.$eval(attrs.ngMinlength) );
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

			controller.$validators.email = function(modelValue) {
          		return controller.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        	};

			var process_ngMissmatch = function(){
				if( attrs.ngMissmatch){
					if ( angular.isFunction( attrs.ngMissmatch ) ){
						controller.$setValidity( 'missmatch', attrs.ngMissmatch()() );
					}
					else {
						controller.$setValidity( 'missmatch', 
							scope.$eval( attrs.ngMissmatch )//attrs.ngModel + '==' + attrs.ngMissmatch
													//+ '||' +  );
						);
					}
				}
			};

			scope.$watch( attrs.ngModel, function(){
				process_ngMissmatch();
				if (controller.$invalid && controller.$viewValue){
					element.tooltip('show');
				}
				else {
					element.tooltip('hide');
				}
			});
			
			var printf = function() { 
				var num = arguments.length; 
				var oStr = arguments[0];   
				for (var i = 1; i < num; i++) { 
						var pattern = '\\{{' + (i-1) + '\\}}'; 
					var re = new RegExp(pattern, 'g'); 
					oStr = oStr.replace(re, arguments[i]); 
				} 
				return oStr; 
			}; 

		}
	};
});

