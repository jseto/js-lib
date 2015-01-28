'use strict';

/* *
 * @ngdoc module
 * @name jsLib.widgets.message
 */
angular.module('jsLib.widgets.messages', [
])

/**
 * @ngdoc directive
 * @name jsLib.widgets.messages.directive:jswMessagesInclude
 * @restrict AE
 *
 * @description
 * Pass error messages to `ngMessages` in a js/json object.
 * This directive extends the functionality of AngularJS ngMessages directive
 * allowing to pass the error messages in a js/json object.
 * Native funtionality for reusing messages is done in `ngMessages` with the
 * `ngMessagesInclude` but this feature relies on HTML templates. With this
 * extension you can pass messages in a js/json object.
 * @link https://docs.angularjs.org/api/ngMessages|Click here} to learn more
 * about `ngMessages` and `ngMessage`.
 *
 * @param {string} jswMessagesInclude   	an expression evaluating to a js/json
 *                                      	object containing	key value pairs, where
 *                                      	key is the error key and value is the
 *                                      	message related to the error key.
 *
 * @param {string=} template            	a html template where the `ng-message`
 *                                      	attribute will be added with a value of
 *                                      	every key of the key-value pair of the
 *                                      	object in `jswMessagesInclude`.	The
 *                                      	inner text of the template will be
 *                                      	filled with the value	of every key-value
 *                                      	pair in the passed object.
 * @param {function=} jsw-preprocess-msg	Callback funtion to manipulate the error
 *											message just before is going to be rendred.
 *											You can change the message here if you need
 *											to speciallice the error message.
 *											The signature of the callback function is
 *											`callback( key, value )` where `key` is the 
 *											error message key and `message` is the text
 *											of the error message. The function should 
 *											return a string with the new error message.
 *
 */
.directive('jswMessagesInclude', function( $compile ) {
	return {
		scope: {
			jswMessagesInclude: '=',
			jswPreprocessMsg: '&'
		},
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs) {
			var tpl = iAttrs.template ? iAttrs.template : '<div class="text-danger"></div>';

			angular.forEach( $scope.jswMessagesInclude, function( message, key ) {
				var elm = angular.element( tpl );
				elm.attr( 'ng-message', key );
				if ( angular.isFunction( $scope.jswPreprocessMsg() ) ) {
					elm.text( $scope.jswPreprocessMsg()( key, message ) );
				}
				else {
					elm.text( message );
				}
				iElm.append( elm );
				$compile(elm)($scope);
			});
		}
	};
});
