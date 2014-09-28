'use strict';

/* Datepicker Module */

angular.module('jsWidgets.datepicker', [
	'jsUtils.dateConverter'
])

.directive('jswDatepicker', [ 'dateConverter', function( dateConverter ) {

	return {
		require: 'ngModel',
		restrict: 'AEC',
		replace: false,
		link: function(scope, element, attrs, controller) {

			var locale = attrs.jswDatepicker; 
			var modelLocale = 'YYYY-MM-DD';

			controller.$formatters.push( function( modelValue ){
				var date = dateConverter.setDate( modelValue, modelLocale );
				return date.getDate( locale );
			});

			controller.$parsers.push( function( viewValue ){
				var date = dateConverter.setDate( viewValue, locale )
				if ( date.isValid() ){
					element.datepicker( 'setDate', date.toDate() )
				}
				controller.$setValidity( 'date', date.isValid() || viewValue=='' );
				return date.getDate( modelLocale );
			});

 			element.datepicker({
				autoclose: true,
				format: attrs.jswDatepicker.toLowerCase(),
				keyboardNavigation: false,
				forceParse: false,
				clearBtn: true,
				language: 'ca'
			})
			.on('hide', function(){
				var dpDate = dateConverter.setDate( element.datepicker('getDate'), locale );
				scope.$apply( attrs.ngModel + '="' + dpDate.getDate( modelLocale ) + '"' );
			})
			.on('show', function(){
				element.datepicker('update', element.val() );
			});
		}
	};
}])

;
