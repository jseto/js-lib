'use strict';

/**
*  BootstrapInput Directive
*
* Description
*/

angular.module('jsWidgets.input', [
])

.directive('jswInput', function( $compile ){
	return {
		require: '?^form',
		restrict: 'C', 
		template: '<div></div>',
		replace: true,
		transclude: 'element',
		compile: function( element, attrs, transclude ) {
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
			
			element.addClass('form-group');
			element.removeClass('jsw-input');

			if ( attrs.iconL || attrs.addonL || attrs.iconR || attrs.addonR ){
				element.prepend('<div class="input-group"></div>');
				element = element.children();
			}

			if ( attrs.label ){
				element.prepend('<label>'+attrs.label+'</label>');
			}

			var lAddon = createAddon( attrs.iconL, attrs.addonL );
			if ( lAddon ) {
				element.prepend( lAddon );
			}

			element.append('<input />');

			var rAddon = createAddon( attrs.iconR, attrs.addonR );
			if ( rAddon ) {
				element.append( rAddon );
			}

			if ( attrs.helpBlock ){
				element.append('<p class="help-block">'+attrs.helpBlock+'</p>');
			}

			var inputName = element.attr('name');
			if ( attrs.jswMessages ){
				var messageIncElem = angular.element('<ng-messages></ng-messages');
				messageIncElem.attr('for', '$$__' + inputName + '__getError()' );
				messageIncElem.attr('jsw-messages-include', attrs.jswMessages);
				element.after( messageIncElem );
			}

			return function(scope, tElem, tAttrs, ctrl) {
				transclude(scope, function(clone, innerScope) {

					if ( attrs.jswMessages ){
						scope['$$__' + inputName + '__getError'] = function(){
							if ( ctrl ) {
								return ctrl[clone.attr('name')].$error;
							}
							else{
								return {};
							}
						};
					}

					clone.addClass('form-control');
					clone.removeClass( tAttrs.class );
					if (attrs.validationErrors){
						clone.attr( 'jsw-validate-tooltip', tAttrs.validationErrors );
					}
					tElem.find('input').replaceWith($compile(clone)(innerScope));
				});
			}; 
		}
	};
});