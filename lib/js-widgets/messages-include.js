'use strict';

/* Missmatch Module */

angular.module('jsWidgets.messages', [
])

.directive('jswMessagesInclude', function( $compile, $interpolate ) {
	return {
		scope: {
			jswMessagesInclude: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs) {
			var tpl = iAttrs.template? iAttrs.template : '<div class="text-danger"></div>';

			angular.forEach( $scope.jswMessagesInclude, function( message, key ) {
				// var context = { key: _key, message: _message };
				// var exp = $interpolate( tpl );
				var elm = angular.element( tpl );
				elm.attr( 'ng-message', key );
				elm.text( message );
				iElm.append( elm );
				$compile(elm)($scope);
			});
		}
	};
});

