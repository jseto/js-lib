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
	///WebRTC
/*	navigator.getMedia = ( navigator.getUserMedia ||
	                     navigator.webkitGetUserMedia ||
	                     navigator.mozGetUserMedia ||
	                     navigator.msGetUserMedia);

	navigator.getMedia(
		{
		  video: true,
		  audio: false
		},
		function( stream ) {
		    var vendorURL = window.URL || window.webkitURL;
			$scope.$apply( function() {
				$scope.localStream = $sce.trustAsResourceUrl(vendorURL.createObjectURL(stream));
			});
		},
		function(err) {
		  console.log("An error occured! " + err);
		}
	);

	$scope.doCall = function() {
		$scope.sessionId = "10"
	}
*/
	var room = ConferenceRoom();
	room.onLocalStream( function( stream ){
		$scope.localStream = stream;
	});

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

