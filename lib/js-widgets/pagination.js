'use strict';

/**
* Select Directive
*
* Description
*/
angular.module('jsLib.widgets.pagination', []).

directive('jswPagination', function( JSLIB_TEMPLATE_PATH ){
	return {
		scope: {
			extSet: '@jswPagination',
			pageSize: '=',
			activeItem: '='
		}, 
		controller: function($scope, $element, $attrs, $transclude) {
			
			var currentItem;

			$scope.$watchCollection( 'dataSource', function( value ){
				if ( value && value[0] ){
					init();
				}
			});

			var set = [];
			$scope.$watch( 'extSet', function( value ){
				if ( value ){
					if ( !angular.isArray(value) ){
						set = value.split('');
					}
					else {
						set = value;
					}
					init();
				}
			})

			var init = function(){
				currentItem = 0;
				if ( ! $scope.pageSize ){
					$scope.pageSize = 5;
				}
				$scope.disableLess = true;
				$scope.items = items();
			}

			var items = function(){
				return set.slice( currentItem, currentItem + $scope.pageSize );
			}

			$scope.less = function(){
				if ( $scope.disableLess ){
					return;
				}
				currentItem -= $scope.pageSize;
				$scope.items = items();
				$scope.disableLess = currentItem <= 0;
				$scope.disableMore = currentItem >= set.length - $scope.pageSize;
			}

			$scope.more = function(){
				if ( $scope.disableMore ){
					return;
				}
				currentItem += $scope.pageSize;
				$scope.items = items();
				$scope.disableLess = currentItem <= 0;
				$scope.disableMore = currentItem >= set.length - $scope.pageSize;
			}

			$scope.select = function( item ){
				$scope.activeItem = item;
			}
		},
		restrict: 'AECM', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: function( element, attrs ){
			return attrs.template ? attrs.template : JSLIB_TEMPLATE_PATH + 'pagination.html';
		},
	};
});