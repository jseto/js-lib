'use strict';

xdescribe('Datepicker directive', function() {
	var element, scope;

	beforeEach(module('jsWidgets.datepicker'));
	beforeEach(inject(function($rootScope, $compile, $window) {
		
		element = angular.element([
				'<input ',
					'data-jsw-datepicker="dd/MM/yyyy" ',
					'type="text" ',
					'data-ng-model="modelDate"> '
			].join('\n')
		);
		console.log(element)

		scope = $rootScope;
		scope.modelDate = '';
		$compile(element)(scope);
		scope.$digest();
	}));


	it('should show date from datepicker', inject(function($compile, $rootScope) {
		var independenceDay = new Date('11/09/2014');
		 element.datepicker('setDate', independenceDay );
		// expect(element.text).toBe( '11/09/2014' );
	}));
});
