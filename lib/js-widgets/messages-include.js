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
 * Native functionality for reusing messages is done in `ngMessages` with the
 * `ngMessagesInclude` but this feature relies on HTML templates. With this
 * extension you can pass messages in a js/json object.
 * The created elements have the attribute `ng-message` set to the error message
 * key as spected by `ng-messages`. Additionally, the `message-text`attribute is 
 * created an set to the error message text to allow tooltip like elements to set
 * the css `content` property with `attr(message-text)`
 * @link https://docs.angularjs.org/api/ngMessages|Click here} to learn more
 * about `ngMessages` and `ngMessage`.
 *
 * @param {string} jswMessagesInclude   	an expression evaluating to a js/json
 *                                      	object containing	key value pairs, where
 *                                      	key is the error key and value is the
 *                                      	message related to the error key.
 *
 * @param {string=} jswMessageTemplate     	a html template where the `ng-message`
 *                                      	attribute will be added with a value of
 *                                      	every key of the key-value pair of the
 *                                      	object in `jswMessagesInclude`.	The
 *                                      	inner text of the template will be
 *                                      	filled with the value	of every key-value
 *                                      	pair in the passed object.
 * @param {function=} jswPreprocessMessages	Callback function to manipulate the dynamically
 *											the error message just before is going to be
 *											rendered.
 *											You can change the message here if you need
 *											to specialize the error message.
 *											The signature of the callback function is
 *											`callback( key, value )` where `key` is the 
 *											error message key and `message` is the text
 *											of the error message. The function should 
 *											return a string with the new error message.
 * @param {object=} jswOverrideMessages		Fill this object with specialized messages.
 *											The object keys are the error keys and object
 *											values are the message text to be overridden.
 *
 */
.directive('jswMessagesInclude', function( $compile ) {
	return {
		scope: {
			jswMessagesInclude: '@',
			jswPreprocessMessages: '&',
			jswOverrideMessages: '='
		},
		restrict: 'EA', 
		link: function( scope, element, attrs ) {
			var tpl = attrs.jswMessageTemplate ? attrs.jswMessageTemplate : '<div class="jsw-message text-danger"></div>';

			var override = scope.jswOverrideMessages || {};
//TODO: better to wait for 1.4.0 release to see if is easier with new ng-messages
//        https://github.com/angular/angular.js/commit/c9a4421fc3c97448527eadef1f42eb2f487ec2e0
			scope.$root.$watchCollection( attrs.jswMessagesInclude, function( newValue ){
				if ( newValue ) {
					var messages = angular.extend( scope.jswMessagesInclude, override );

					angular.forEach( messages, function( message, key ) {
						var msgText = message;
						if ( angular.isFunction( scope.jswPreprocessMessages() ) ) {
							msgText = scope.jswPreprocessMessages()( key, message );
						}

						var elm = angular.element( tpl );
						elm.attr( 'ng-message', key );
						elm.text( msgText );
						elm.attr( 'message-text', msgText );

						element.append( elm );
						$compile(elm)(scope);
					});
				}
			});
		}
	};
});
