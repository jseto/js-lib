// describe('Datepicker directive', function() {
// 	var element, scope;

// 	beforeEach(inject(function($rootScope, $compile, $window) {
// 		module('jsWidgets.datepicker');
// 		// we might move this tpl into an html file as well...
// 		element.appendTo(document.body);
// 		element = angular.element(
// 				'<input '
// 					+ 'data-jsw-datepicker="dd/MM/yyyy" ' 
// 					+ 'type="text" ' 
// 					+ 'data-ng-model="modelDate"> '
// 		);

// 		scope = $rootScope;
// 		scope.modelDate = '';
// 		$compile(element)(scope);
// 		scope.$digest();
// 	}));


// 	it('should show date from datepicker', inject(function($compile, $rootScope) {
// 		var independenceDay = new Date('11/09/2014')
// //		 element.datepicker('setDate', independenceDay );
// 		// expect(element.text).toBe( '11/09/2014' );
// 	}));
// });
