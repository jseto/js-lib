'use strict';

/**
*  BootstrapInput Directive
*
* Description
*/

angular.module('jsWidgets.input', [
])

.directive('jswInput', function(){
	return {
		require: '?^form',
		restrict: 'AC', 
		compile: function( element, attrs ) {
			var createAddon = function( icon, addon ) {
				if ( icon || addon ){
					addon = addon || '';
					icon = icon || '';

					var addonSpan = '<span class="input-group-addon">' + addon;
					if ( icon ) {
						addonSpan += '<i class="icon-fixed-width ' + icon + '"></i>';
					}
					addonSpan += '</span>';
					return addonSpan;
				}
				return false;
			};

			var inputName = element.attr('name');

			var installMessages = function(){
				var messageIncElem = angular.element('<ng-messages></ng-messages');
				messageIncElem.attr('for', '$$__' + inputName + '__getError()' );
				messageIncElem.attr('jsw-messages-include', attrs.jswMessages);
				return messageIncElem;
			};

			var createFormGroup = function( element ) {
				element.wrap('<div class="form-group"></div>');

				element.removeClass('jsw-input');
				element.removeAttr('jsw-input');
				element.addClass('form-control');

				var formGroup = element.parent();
				var inputGroup = formGroup;

				if ( attrs.iconL || attrs.addonL || attrs.iconR || attrs.addonR ){
					element.wrap('<div class="input-group"></div>');
					inputGroup = element.parent();
				}

				var lAddon = createAddon( attrs.iconL, attrs.addonL );
				if ( lAddon ) {
					inputGroup.prepend( lAddon );
				}

				if ( attrs.label ){
					formGroup.prepend('<label>'+attrs.label+'</label>');
				}

				var rAddon = createAddon( attrs.iconR, attrs.addonR );
				if ( rAddon ) {
					inputGroup.append( rAddon );
				}
	
				if ( attrs.jswMessages ){
					formGroup.append( installMessages() );
				}

				if ( attrs.helpBlock ){
					formGroup.append('<p class="help-block">'+attrs.helpBlock+'</p>');
				}
			};

			var cleanAttrs = function(){
				angular.forEach( attrs.$attr, function( value ){
					if ( value!=='class' ) {
						element.removeAttr(value);
					}
				});
				element.removeClass('ng-scope');
			};

			createFormGroup( element );

			return function(scope, tElem, tAttrs, ctrl ) {

				var attachScopeToMessages = function( scope, elm ){
					scope['$$__' + inputName + '__getError'] = function(){
						if ( ctrl ) {
							return ctrl[elm.attr('name')].$error;
						}
						else{
							return {};
						}
					};
				};

				if ( attrs.jswMessages ){
					attachScopeToMessages( scope, element );
				}
				// 	clone.addClass('form-control');
				// 	clone.removeClass( attrs.class );

				// 	if (attrs.validationErrors){
				// 		clone.attr( 'jsw-validate-tooltip', attrs.validationErrors );
				// 	}

				// 	cleanAttrs();
				// 	element.find('input').replaceWith( clone );
				// });
			};
		}
	};
});