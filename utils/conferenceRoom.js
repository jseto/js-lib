'use strict';

/**
*  Module jsLib.conferenceRoom
*
*/

angular.module('jsLib.conferenceRoom', [

])

.factory('ConferenceRoom', function( $sce, $q ){
	return function( mediaConfig ) {

		if (!mediaConfig){
			mediaConfig = {
				video: "true",
				audio: "true" 
			}
		}

		var localStream = null;
		var localStreamDefer = $q.defer();

		navigator.getMedia = ( navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);

		navigator.getMedia(
			mediaConfig,
			function( stream ) {
				var vendorURL = window.URL || window.webkitURL;
				localStreamDefer.resolve( $sce.trustAsResourceUrl(vendorURL.createObjectURL(stream)) );
			},
			function(err) {
				localStreamDefer.reject();
			  	console.log("An error occured! " + err);
			}
		);

		return {
			onLocalStream: function( handler ){
				localStreamDefer.promise.then( function( stream ){ handler( stream ) });
			},
		}
	}
})

;