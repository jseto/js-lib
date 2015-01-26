'use strict';

/* Messages Module */

angular.module('jsWidgets.messages', [
])

/**
 * @ngdoc directive
 * @module jsWidgets.message
 * @name jswMessagesInclude
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
 * @param {string} jswMessagesInclude   an expression evaluating to a js/json
 *                                      object containing	key value pairs, where
 *                                      key is the error key and value is the
 *                                      message related to the error key.
 *
 * @param {string=} template            a html template where the `ng-message`
 *                                      attribute will be added with a value of
 *                                      every key of the key-value pair of the
 *                                      object in `jswMessagesInclude`.	The
 *                                      inner text of the template will be
 *                                      filled with the value	of every key-value
 *                                      pair in the passed object.
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
