'use strict';

describe('validate-tooltip directive', function() {
	var $compile;
	var	$rootScope;

	var validationErrors = [
				'	{',
				'		"matchPassword": "Els mots de pas no son iguals",',
				'		"unique": "Ja existeix",',
				' 		"email": "L\'adreça de correu no es correcta",',
				'		"required": "Es necessari omplir aquest camp",',
				'		"date": "La data introduïda no es correcta",',
				'		"file": "El fitxer no s\'ha pogut enviar. (mida màx.: 1,5Mb, tipus: jpg, png, gif)",',
				'		"minlength": "Ha de tenir {{0}} caràcters com a mínim",',
				'		"unknown": "Error de validació desconegut"',
				'	}' 
			].join('\n');

	var elementHtml = [
				'<input ',
				'	type="text"',
				'	class="form-control" ',
				'	placeholder="user name" ',
				'	ng-model="user.username"',
				'	ng-minlength=3',
				'	ng-pattern="/^\\s*\\w*\\s*$/"',
				'	ng-pattern-error-message="validationError.only1word"',
				' 	jsw-missmatch="user.username == \'frank\'"',
				'	tooltip-placement="bottom"',
				'	jsw-validate-tooltip="{{validationErrors}}"',
				'	required>',
		].join('\n');

	var compile = function( scope, html ) {
		// Compile a piece of HTML containing the directive
		scope.validationErrors = validationErrors;
		var element = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return element;
	};

	// Load the directive module
	beforeEach(
		module('jsWidgets.validateTooltip')
	);

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Element has proper classes', function() {
		var element = compile( $rootScope, elementHtml );
		expect( $rootScope.user ).toBeUndefined();
		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);

		expect(	element.hasClass('ng-valid-required') ).toBe(false);
		expect(	element.hasClass('ng-invalid-required') ).toBe(true);

		expect(	element.hasClass('ng-valid-minlength') ).toBe(true);
		expect(	element.hasClass('ng-invalid-minlength') ).toBe(false);

		expect(	element.hasClass('ng-valid-pattern') ).toBe(true);
		expect(	element.hasClass('ng-invalid-pattern') ).toBe(false);

		expect(	element.hasClass('ng-valid-jsw-missmatch') ).toBe(false);
		expect(	element.hasClass('ng-invalid-jsw-missmatch') ).toBe(true);
	});

	it('Gets the valid state', function() {
	 	$rootScope.user = { username : 'frank' };
	 	var element = compile( $rootScope, elementHtml );

		expect(	element.hasClass('ng-valid') ).toBe(true);
		expect(	element.hasClass('ng-invalid') ).toBe(false);

		expect(	element.hasClass('ng-valid-required') ).toBe(true);
		expect(	element.hasClass('ng-invalid-required') ).toBe(false);

		expect(	element.hasClass('ng-valid-minlength') ).toBe(true);
		expect(	element.hasClass('ng-invalid-minlength') ).toBe(false);

		expect(	element.hasClass('ng-valid-pattern') ).toBe(true);
		expect(	element.hasClass('ng-invalid-pattern') ).toBe(false);

		expect(	element.hasClass('ng-valid-jsw-missmatch') ).toBe(true);
		expect(	element.hasClass('ng-invalid-jsw-missmatch') ).toBe(false);
	});

	it('Gets the invalid because minlenght and missmatch', function() {
	 	$rootScope.user = { username : 'fr' };
	 	var element = compile( $rootScope, elementHtml );

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);

		expect(	element.hasClass('ng-valid-minlength') ).toBe(false);
		expect(	element.hasClass('ng-invalid-minlength') ).toBe(true);

		expect(	element.hasClass('ng-valid-jsw-missmatch') ).toBe(false);
		expect(	element.hasClass('ng-invalid-jsw-missmatch') ).toBe(true);
	});

	it('Gets the invalid because pattern', function() {
	 	$rootScope.user = { username : 'frank de la jungla' };
	 	var element = compile( $rootScope, elementHtml );

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);

		expect(	element.hasClass('ng-valid-pattern') ).toBe(false);
		expect(	element.hasClass('ng-invalid-pattern') ).toBe(true);
	});
});