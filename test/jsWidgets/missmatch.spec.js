'use strict';

describe('jswMissmatch directive', function() {
	var scope, $compile;

	var compile = function( scope, html ) {
		// Compile a piece of HTML containing the directive
		var element = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return element;
	};

	beforeEach( module('jsWidgets.missmatch') );
	
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	it('matches constant', function() {
		var elmHtml = '<input jsw-missmatch="\'frank\'" ng-model="model">';

		scope.model = 'frank';
		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(true);
		expect(	element.hasClass('ng-invalid') ).toBe(false);
	});

	it('does not match constant', function() {
		var elmHtml = '<input jsw-missmatch="\'frank\'" ng-model="model">';

		scope.model = 'frank de la jungla';
		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);
	});

	it('matches with scope variable', function() {
		var elmHtml = '<input jsw-missmatch="scopeVar" ng-model="model">';

		scope.model = 'frank';
		scope.scopeVar = 'frank';
		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(true);
		expect(	element.hasClass('ng-invalid') ).toBe(false);
	});

	it('does not match with scope variable', function() {
		var elmHtml = '<input jsw-missmatch="scopeVar" ng-model="model">';

		scope.model = 'frank de la jungla';
		scope.scopeVar = 'does not play anymore';
		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);
	});

	it('matches using function', function() {
		var elmHtml = '<input jsw-missmatch="somethingToMatch()" ng-model="model">';
		var functionCalled = false;

		scope.model = 'frank';
		scope.somethingToMatch = function() {
			functionCalled = true;
			return 'frank';
		};

		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(true);
		expect(	element.hasClass('ng-invalid') ).toBe(false);
		expect( functionCalled ).toBe( true );
	});

	it('does not match using function', function() {
		var elmHtml = '<input jsw-missmatch="somethingToMatch()" ng-model="model">';
		var functionCalled = false;

		scope.model = 'frank goes to hollywood';
		scope.somethingToMatch = function() {
			functionCalled = true;
			return 'frank';
		};

		var element = compile(scope, elmHtml);

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);
		expect( functionCalled ).toBe( true );
	});

});