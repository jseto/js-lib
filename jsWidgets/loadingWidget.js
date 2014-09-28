'use strict';

/* LoadingWidget Module */

angular.module('pt.loadingWidget', [

])

.directive('loadingWidget', function(){
	return {
		scope: {
			showLoading: '=loadingWidget'
		}, 
		replace: false,
		restrict: 'AECM',
		template: '<i ng-show="showLoading" class="icon-spinner icon-spin"></i>',
	};
})

;
