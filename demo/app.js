'use strict';

/* App Module */

angular.module('myApp', [
	'jsWidgets'
])

.run( function run ( $rootScope, $state, $stateParams ) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})

.controller( 'AppCtrl', [ '$scope', 'locFilter', function ( $scope, locFilter ) {
}])

;

