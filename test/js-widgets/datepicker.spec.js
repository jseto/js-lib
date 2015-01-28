'use strict';

describe('Datepicker directive', function() {
	var element, scope;

	beforeEach(module('jsLib.widgets.datepicker'));
	beforeEach(inject(function($rootScope, $compile) {
		
		element = angular.element([
				'<input ',
					'data-jsw-datepicker="dd/MM/yyyy" ',
					'type="text" ',
					'data-ng-model="modelDate"> '
			].join('\n')
		);

		scope = $rootScope;
		scope.modelDate = '';
		$compile(element)(scope);
		scope.$digest();
	}));


	it('should show date from datepicker', function() {
		var independenceDay = new Date('11/09/2014');
		 element.datepicker('setDate', independenceDay );
		// expect(element.text).toBe( '11/09/2014' );
	});
});
