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
		var call = null;
		var localStreamDefer = $q.defer();
		var remoteStreamDefer = $q.defer();

		var peer = new Peer( 'test', { key: '86dgcccp4fe0zfr' });

		navigator.getMedia = ( navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);

		navigator.getMedia(
			mediaConfig,
			function( stream ) {
				var vendorURL = window.URL || window.webkitURL;
				localStream =  stream;
				localStreamDefer.resolve( $sce.trustAsResourceUrl( vendorURL.createObjectURL(localStream) ) );
			},
			function(err) {
				localStreamDefer.reject();
			  	console.error("An error occured! " + err);
			}
		);

		peer.on('call', function(call) {
			// Answer the call, providing our mediaStream
			if ( localStream ) {
				call.answer( localStream);
			}
			else console.error("cannot answer call");
		});

		return {
			onLocalStream: function( handler ){
				localStreamDefer.promise.then( function( stream ){ handler( stream ) });
			},

			call: function( calleeId ) {
				if ( localStream ) {
					call = peer.call( calleeId, localStream );
					call.on( 'stream', function( stream){
						remoteStreamDefer.resolve( stream );
					})
				}
				else console.error("error on call");
			},

			onRemoteCall: function( handler ) {
				remoteStreamDefer.promise.then( function( stream ){ handler( stream ) } );
			}

		}
	}
})

;