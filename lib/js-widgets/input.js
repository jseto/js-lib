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
//		template: '<div></div>',
//		replace: true,
//		transclude: 'element',
		link: function( scope, element, attrs, ctrl, transclude ) {
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

/*	original fro transclusion
			var createFormGroup = function( element ) {
				var el = element;
				el.addClass('form-group');

				el.removeClass('jsw-input');

				if ( attrs.iconL || attrs.addonL || attrs.iconR || attrs.addonR ){
					el.prepend('<div class="input-group"></div>');
					el = el.children();
				}

				var lAddon = createAddon( attrs.iconL, attrs.addonL );
				if ( lAddon ) {
					el.prepend( lAddon );
				}

				if ( attrs.label ){
					element.prepend('<label>'+attrs.label+'</label>');
				}

				el.append('<input />');

				var rAddon = createAddon( attrs.iconR, attrs.addonR );
				if ( rAddon ) {
					el.append( rAddon );
				}

				if ( attrs.helpBlock ){
					element.append('<p class="help-block">'+attrs.helpBlock+'</p>');
				}
			};
*/
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

			var inputName = element.attr('name');

			var installMessages = function(){
				if ( attrs.jswMessages ){
					var messageIncElem = angular.element('<ng-messages></ng-messages');
					messageIncElem.attr('for', '$$__' + inputName + '__getError()' );
					messageIncElem.attr('jsw-messages-include', attrs.jswMessages);
					element.after( messageIncElem );
				}
			};

			var attachScopeToMessages = function( scope, clone ){
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
			};

			createFormGroup( element );
			installMessages();
			// transclude(scope, function(clone) {
			// 	attachScopeToMessages( scope, clone );
			// 	clone.addClass('form-control');
			// 	clone.removeClass( attrs.class );

			// 	if (attrs.validationErrors){
			// 		clone.attr( 'jsw-validate-tooltip', attrs.validationErrors );
			// 	}

			// 	cleanAttrs();
			// 	element.find('input').replaceWith( clone );
			// });
		}
	};
});