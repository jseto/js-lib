'use strict';

/* App Module */

angular.module('myApp', [
	'jsWidgets'
])

.config( function( LocaleProvider ) {
	/*** Locale setup */
	LocaleProvider.setLocale('ca');
	LocaleProvider.setLocalePath('../test/locale/');
})

.run( function run ( $rootScope ) {
})

.controller( 'AppCtrl', function ( $scope, locFilter ) {
/*	/// btnUpload
	$scope.onUploaded = function( file, status, errorMsg ) {
		if (status) {
			$scope.imageError = '';
			$scope.model.picture = $scope.model.id + '-' + file.name; 
			$scope.model.update();
		}
		else {
			$scope.imageError = Locale.localize('validationErrors.file');
			$scope.$apply();
		}
	}

	$scope.postdata = function( file ){
		return {
			id: $scope.model.id,
			userfile: file
		}
	}
*/
	/// lookup
	$scope.lookupFocus = function( find ){
		// TODO: optimize rest calls ex. if ( lastValue == value ) return
//		$scope.findData( find );
	}

})

;

