'use strict';

/**
*  BootstrapInput Directive
*
* Description
*/

angular.module('jsWidgets.input', [
])

/**
 * @ngdoc directive
 * @module jsWidgets.input
 * @name jswInput
 * @restrict AC
 *
 * @description
 * Implements Bootstrap decorators and adds functionality to `<input/>` element.
*
 * @param {string} jswMessagesInclude 	an expression evaluating to a js/json object containing
 *                                     		key value pairs, where key is the error key and value
 *									   		is the message related to the error key
 * @param {string=} template 			a html template where the `ng-message` attribute will be added
 *											with a value of every key of the key-value pair of the object
 *											in `jswMessagesInclude`.
 *											The inner text of the template will be filled with the value
 *											of every key-value pair in the passed object.
 *
 * @example
 * <example name="jswMessages-directive" module="jswMessagesExample"
 *          deps="angular-messages.js"
 *          animations="true" fixBase="true">
 *   <file name="index.html">
 *     <form name="myForm">
 *       <label>Enter your name:</label>
 *       <input type="text"
 *              name="myName"
 *              ng-model="name"
 *              ng-minlength="5"
 *              ng-maxlength="20"
 *              required />
 *
 *       <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>
 *
 *       <div ng-messages="myForm.myName.$error" jsw-messages-include="errorMessages" style="color:maroon"></div>
 *     </form>
 *   </file>
 *   <file name="script.js">
 *     angular.module('ngMessagesExample', ['ngMessages'])
 *     controller('jswMessagesCtrl', function( $scope ){
 *		$scope.errorMessages = {
 *			required: 'You did not enter a field',
 *         	minlength: 'Your field is too short',
 *         	maxlength: 'Your field is too long'
 *		};
 *       $scope.templ = "<h1 style="color: red;"></h1>"
 *    });
 *   </file>
 * </example>
 */
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
			};
		}
	};
});