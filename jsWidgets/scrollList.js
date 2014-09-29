'use strict';

/**
* Scroll List Directive
*
* Description
*/
angular.module('jsWidgets.scrollList', []).

directive('jswScrollList', function( $compile, JSLIB_TEMPLATE_PATH ){
	return {
		scope: {
			data: '=jswScrollList',
			maxElements: '=',
			render: '&',
			search: '=',
			fixedHeight: '@',
			findData: '&',
			moreData: '&',
			lessData: '&'
		}, 
		controller: 'ScrollListCtrl',
		restrict: 'AECM',
		templateUrl: function( element, attrs ){
			return attrs.template ? attrs.template : JSLIB_TEMPLATE_PATH + 'scrollList.html';
		},
	};
})

.controller('ScrollListCtrl', function($scope, $element, $attrs, $transclude ) {

	var currentElement;
	var dataSourceArray;

	var init = function(){
		currentElement = 0;
		$scope.dummyItems = [];
		dataSourceArray = buildDataArray();
		$scope.elements = elements();
		setEnabledState();
	}

	var buildDataArray = function(){
		var array = toArray( $scope.data );
		// if ( $scope.search ){
		// 	var regex = new RegExp( '(\\b' + $scope.search + ')\\w+\\b', 'i' );
		// 	return $filter( 'filter' )( array, function( element ){
		// 		return $scope.renderAs( element ).match( regex );
		// 	});
		// }
		// else {
		// 	return array;
		// }
		return array;
	}

	var toArray = function( data ){
		if ( typeof data.slice === 'function' ){
			return data; //$filter('orderBy')( data, $scope.renderAs );
		}

		var arr = [];
		angular.forEach( data, function(value, key){
			arr.push( value );
		});
		return arr;//$filter('orderBy')( arr, $scope.renderAs );
	}

	var elements = function(){
		var aSlice = dataSourceArray 
						? dataSourceArray.slice( currentElement, currentElement + $scope.maxElements )
						: [];
		$scope.dummyItems = [];
		if ( $scope.fixedHeight ){
			for (var i = aSlice.length; i < $scope.maxElements; i++) {
				$scope.dummyItems.push(i);
			};
		}
		return aSlice;
	}
	elements();

	var setEnabledState = function(){
		$scope.disableUp = currentElement <= 0;
		$scope.disableDown = currentElement >= dataSourceArray.length - $scope.maxElements;
	}

	$scope.listUp = function(){
		if ( $scope.disableUp ){
//					return;
		}

		currentElement -= currentElement > $scope.maxElements
								? $scope.maxElements
								: currentElement;

		$scope.elements = elements();
		if ( $scope.disableUp ){
			if ( $scope.lessData() ){
				$scope.data = $scope.lessData()( dataSourceArray[0], $scope.search )
			}
		}
		setEnabledState();
	}

	$scope.listDown = function(){
		if ( $scope.disableDown ){
//					return;
		}

		currentElement += dataSourceArray.length - currentElement - 1 > $scope.maxElements
								? $scope.maxElements
								: dataSourceArray.length - currentElement - $scope.maxElements;

		$scope.elements = elements();

		if ( $scope.disableDown ){
			if ( $scope.moreData() ){
				$scope.data = $scope.moreData()( dataSourceArray[dataSourceArray.length], $scope.search )
			}
		}
		setEnabledState();
	}

	$scope.selectElement = function( element ){
		$scope.selectedElement = element;
		$scope.$emit('selectedElement', $scope.selectedElement );
		$scope.search = $scope.renderAs( element );
	}

	$scope.$watchCollection( 'data', function( value ){
		if ( value && value.promise ){
			value.promise.then( function(){
				init();
			})
		}
		else {
			if ( value && value[0] ){
				init();
			}
		}
	});

	$scope.$watch( 'search', function( value ){
		if ( $scope.findData() ){
			$scope.findData()( value );
		}
		if ( $scope.data && $scope.data[0] ){
			$scope.elements = elements();
		}
	});

	$scope.renderAs = function( element ){
		if ( $scope.render() ){
			return $scope.render()( element );
		}
		else {
			return element;
		}
	}	
});
