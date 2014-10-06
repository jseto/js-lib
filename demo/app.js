'use strict';

/* App Module */

angular.module('myApp', [
	'jsWidgets',
	'jsLib.conferenceRoom'
])

.config( function( LocaleProvider ) {
	/*** Locale setup */
	LocaleProvider.setLocale('ca');
	LocaleProvider.setLocalePath('../test/locale/');
})

.run( function run ( $rootScope ) {
})

.controller( 'AppCtrl', function ( $scope, locFilter, ConferenceRoom ) {
	var room = ConferenceRoom();
	room.onLocalStream( function( stream ){
		$scope.localStream = stream;
	});

	$scope.doCall = function() {
		room.call('test');
	}
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

	///select
	$scope.sets = 4;
})

;

