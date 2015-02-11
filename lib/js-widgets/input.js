'use strict';

/* *
 * @ngdoc module
 * @name jsWidgets.input
 */
angular.module('jsLib.widgets.input', [
	'jsLib.utils.sprintf'
])

/**
 * @ngdoc directive
 * @name jsWidgets.input.directive:jswInput
 * @restrict AC
 *
 * @description
 * Implements Bootstrap decorators and adds functionality to `<input/>` element.
 *
 * @param {string=} icon-l			 	the css class name of the icon to be used as addon at the left 
 *											of the input element.
 * @param {string=} icon-r 				same as icon-l but at the right.
 * @param {string=} addon-l 			a character or string to be used as addon at the left of the 
 *											input element.
 * @param {string=} addon-r				same as `addon-l` but at the right.
 * @param {string=} label				the label string of the label element associated to the input 
 * 											element.
 * @param {string=} help-block 			a string to show help info for the input element
 * @param {string=} jsw-messages 		the error messages source to be passed to the subjacent 
 *											`jsw-messages-include`. The presence of this parameter 
 *											installs `ng-messages` embedded in the input element.
 *
 * @example
   <example module="jswWidgets.jswInput"
		   deps="angular-messages.js"
		   animations="true" fixBase="true">
	<file name="index.html">
		<form name="myForm">
			<input type="text"
				jsw-input
				name="myName"
				ng-model="name"
				ng-minlength="5"
				ng-maxlength="20"
				label="Enter your earnings"
				icon-r="glyphicon glyphicon-euro"
				addon-l="be honest"
				help-block="Just joking. Enter whatever you want"
				jsw-messages="errorMessages"
				required />
	   </form>
	</file>
	<file name="script.js">
		angular.module('ngMessagesExample', ['ngMessages']) 
		.controller('jswMessagesCtrl', function( $scope ){
			$scope.errorMessages = {
				required: 'You did not enter a field',
				minlength: 'Your field is too short',
				maxlength: 'Your field is too long'
			};
		});
	</file> 
  </example> 
 */
.directive('jswInput', function( sprintfFilter ){
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

			var installMessages = function( inputName ){
				var messageIncElem = angular.element('<div class="jsw-messages"></div>');

				if (inputName) {
					if ( attrs.jswOverrideMessages ){
						messageIncElem.attr( 'jsw-override-messages', attrs.jswOverrideMessages );
					}
					messageIncElem.attr( 'jsw-messages-include', attrs.jswMessages );
					messageIncElem.attr( 'ng-messages', '$$__' + inputName + '__getError()' );
					messageIncElem.attr( 'jsw-preprocess-messages', '$$__' + inputName + '__preprocess' );
				}
				else {
					if ( attrs.jswMessages ) {
						throw 'Attribute name required to use embedded ng-messages';
					}
				}
				return messageIncElem;
			};

			var removeInputClasses = function( element, classes ){
				element.removeClass('jsw-input');
				element.removeAttr('jsw-input');
				angular.forEach( classes, function( pclass ){
					element.removeClass( pclass );
				});
			};

			var createFormGroup = function( element ) {
				var inputClass = ( attrs.class || '' ).replace( 'jsw-input', '' ).trim();

				element.wrap('<div class="form-group ' + inputClass + '"></div>');

				removeInputClasses( element, inputClass.split(' ') );
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
					formGroup.append( installMessages( inputName ) );
				}

				if ( attrs.helpBlock ){
					formGroup.append('<p class="help-block">'+attrs.helpBlock+'</p>');
				}
			};

			createFormGroup( element );

			return {
				pre: function(scope, tElem, tAttrs, ctrl ) {
					var attachScopeToMessages = function( scope, elm ){
						if ( inputName ) {
							scope['$$__' + inputName + '__getError'] = function(){
								var error = {};

								if ( ctrl ) {
									var ctrlElement = ctrl[elm.attr('name')];

									if ( ctrlElement ) {
										if ( !ctrlElement.$pristine || ctrl.$submitted ){
											error = ctrlElement.$error;
										}
									}
								}
								return error;
							};
							scope['$$__' + inputName + '__preprocess'] = function( key, message ){
								switch( key ) {
									case 'minlength':
									case 'ngMinlength':
										var minlength = attrs.minlength || attrs.ngMinlength;
										message = sprintfFilter( message, minlength );
										break;
									case 'maxlength':
									case 'ngMaxlength':
										var maxlength = attrs.maxlength || attrs.ngMaxlength;
										message = sprintfFilter( message, maxlength );
										break;
								}
								return message;
		 					};
		 				}
					};

					if ( attrs.jswMessages ){
						attachScopeToMessages( scope, element );
					}
				}
			};
		}
	};
});