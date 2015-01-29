'use strict';

/* App Module */

angular.module('myApp', [
	'ngMessages',
	'jsLib.widgets',
	'jsLib.locale',
	'jsLib.utils'
])

.config( function( LocaleProvider ) {
	/*** Locale setup */
	LocaleProvider.setLocale('ca');
	LocaleProvider.setLocalePath('locale/');
})

.constant( 'JSLIB_TEMPLATE_PATH', 'lib/js-widgets/templates/' )

.controller( 'AppCtrl', function ( $scope, locFilter, ConferenceRoom, sprintfFilter ) {
	var room = null;

	$scope.preprocessError = function( key, message ){
		if (key == 'minlength'){
			message = sprintfFilter( message, 3 );
		}
		return message;
	};

	$scope.preprocessErrorEmail = function( key, message ){
		if (key == 'minlength'){
			message = sprintfFilter( message, 8 );
		}
		return message;
	};

	$scope.testVideoCall = function(){
		room = new ConferenceRoom();
		room.onLocalStream( function( stream ){
			$scope.localStream = stream;
		});
	};

	$scope.doCall = function() {
		room.call('test');
	};

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
	};

	///select
	$scope.sets = 4;
})

;

