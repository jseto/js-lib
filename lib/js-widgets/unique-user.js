'use strict';

angular.module('jsWidgets.uniqueUser', [
])

.directive( 'jswUniqueUser', function( $q ){
	return {
		scope: {
			jswUniqueUser: '&'
		},
		require: 'ngModel',
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function( scope, elm, attrs, controller) {
			controller.$asyncValidators.jswUniqueUser = function( modelValue, viewValue ) {
				var value =  modelValue || viewValue || '';

				if ( !value ) return $q.reject('empty');

				return scope.jswUniqueUser()( value ).then(
						function resolved() {
							//username exists, this means validation fails
							return $q.reject('exists');
						},
						function rejected() {
							//hey! user does not exists, then validation is ok
							return true;
						});
			};
		}
	};
});

/**
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * **Note:** ie<9 needs pollyfill for window.getComputedStyle
 *
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
 */
angular.module('rfx', []).directive('rAutogrow', function() {
  //some nice code
});