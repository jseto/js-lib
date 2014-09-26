'use strict';

/**
*  BtnUpload
*
*  BootStrap upload button
*/
angular.module('jsWidgets.btnUpload', [

])

.directive('jswBtnUpload', [ 'remoteUrl', function( remoteUrl ){
	return {
		require: 'ngModel',
		scope: {
			onUploaded: '&jswBtnUpload',
			postData: '&'
		},
		restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, element, attrs, controller) {

			element.on('change', function(){
				var file = element[0].files[0];
				var fd = new FormData();

				appendPosts( fd, file );

				var xhr = new XMLHttpRequest()

		//		xhr.upload.addEventListener("progress", uploadProgress, false)
				xhr.onerror = function() {
					// never called!!!!
					uploaded( file, false, 'Could not upload file');
				};
		//		xhr.addEventListener("abort", uploadCanceled, false)

				xhr.onloadend = function() {
					uploaded( file, this.status, this.response );
				};

				xhr.open( 'POST', remoteUrl + '/upload' );
				scope.$broadcast('fileUploadStart');
				xhr.send(fd);
			});

			function uploaded( file, status, response ){

				scope.$broadcast('fileUploadStop');

				var success = status<400;
				
//				controller.$setValidity( 'file', success );

				if ( angular.isFunction( scope.onUploaded() ) ){
					scope.onUploaded()( file, status < 400, response );
				}
				else {
					// TODO: not working
					scope.$apply( attrs.ngModel + '=' + attrs.jswBtnUpload );
					console.log( scope.onUploaded() );// status < 400 );
				}
			}

			function appendPosts( formData, file ){			
				var pData = {
					filename: file.name,
					userfile: file
				};

				if ( angular.isFunction( scope.postData() ) ){
					angular.extend( pData, scope.postData()( file ) );
				}
				else {
					throw 'Shoud be a function';
				}

				angular.forEach( pData, function(value, key){
					formData.append( key, value );
				});
			}


		}
	}
}]);