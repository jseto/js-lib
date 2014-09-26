'use strict';

/**
* Lookup Widget Module
*
* Description
*/
angular.module('jsWidgets.lookup', [
	'jsWidgets.input',
	'jsWidgets.scrollList'
])

.directive('jswLookup', function( $compile ){
	return {
		require: 'ngModel', 
		restrict: 'AC', 
		replace: true,
		compile: function( element, attrs ) {
			var el = angular.element(
				'	<input class="jsw-input '+attrs.class+'"	'+
				'		icon="icon-search"						'+
				'		ng-model="'+attrs.ngModel+'"	 		'+
				'		placeholder="'+attrs.placeholder+'"		'+
				'		>								 		'+
				'	<div jsw-scroll-list="'+attrs.jswLookup+'"	'+
				'		class="hidden"							'+
				'		render="'+attrs.render+'"				'+
				'		search="'+attrs.ngModel+'"		 		'+
				'		max-elements="'+attrs.maxElements+'"	'+
				'		more-data="'+attrs.moreData+'"			'+
				'		less-data="'+attrs.lessData+'"			'+
				'		find-data="'+attrs.findData+'"			'+
				'		>										'+
				'	</div>										'
			);

			element.append( el );

			return function( scope, tElem, tAttrs ){
				var inputFocus = false;
				var listFocus = false;
				var enableList = function(){
					var ele = tElem.find('div[jsw-scroll-list]');
					inputFocus || listFocus? ele.removeClass('hidden') : ele.addClass('hidden');
				}

				tElem.find('input').on('focus', function(){
					scope.$eval( tAttrs.ngFocus );
					inputFocus = true;
					enableList();
				});
				tElem.find('input').on('blur', function(){
					inputFocus = false;
					enableList();
				});

				tElem.find('div[jsw-scroll-list]').on('mouseenter', function(){
					listFocus = true;
					enableList();
				});
				tElem.find('div[jsw-scroll-list]').on('mouseleave', function(){
					listFocus = false;
					enableList();
				});

				scope.$on( 'selectedElement', function(){
					listFocus = false;
					enableList();
				} )
			}
		}
	};
});

