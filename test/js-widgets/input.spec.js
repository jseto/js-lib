'use strict';

describe('jswInput directive', function() {
	var scope, $compile;

	var compile = function( scope, html ) {
		// Compile a piece of HTML containing the directive
		var el = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return el;
	};

	beforeEach( module('jsWidgets.input') );
	// beforeEach( module('jsWidgets.messages') );
	// beforeEach( module('ngMessages') );
	
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	var checkBasics = function( inputElm ) {
		expect( inputElm.hasClass('jsw-input')).toBeFalsy();
		expect( inputElm.attr('name') ).toBe('test');
		expect( inputElm.attr('placeholder') ).toBe('placeholder for test');
		expect( inputElm.attr('ng-model') ).toBe('model');
		expect( inputElm.hasClass('form-control')).toBeTruthy();
		expect( inputElm.prop('tagName') ).toBe('INPUT');
	};

	it('has basic attributes and classes', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input"',
				'	name="test"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	/>',
				''].join('\n');
		var el = compile( scope, elmHtml );
		var input = el.children();

		checkBasics( input );
		expect(	el.hasClass('form-group') ).toBeTruthy();
	});

	it('has external decorators', function() {
		var elmHtml = [
					'<input ',
					'	class="jsw-input" ',
					'	name="test"',
					'	placeholder="placeholder for test"',
					'	ng-model="model"',
					'	label="testLabel" ',
					'	help-block="help for test"',
					'	/>',
					''].join('\n');

		var el = compile( scope, elmHtml );
		var label = el.children();
		var input = label.next();
		var helpBlock = input.next();


		checkBasics( input );
		expect(	el.hasClass('form-group') ).toBeTruthy();

		expect( label.prop('tagName') ).toBe('LABEL');
		expect( helpBlock.hasClass('help-block')).toBeTruthy(); 

		expect( label.html() ).toBe('testLabel');
		expect( helpBlock.html() ).toBe('help for test');
	});

	it('has external decorators', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input" ',
				'	name="test"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	icon-l="fa fa-arrow-left"',
				'	addon-r="right"',
				'	/>',
				''].join('\n');

		var el = compile( scope, elmHtml );
		var divInputGroup = el.children().first();
		var addonL = divInputGroup.children().first();
		var input = addonL.next();
		var addonR = input.next();

		checkBasics( input );

		expect(	el.hasClass('form-group') ).toBeTruthy();
		expect( divInputGroup.hasClass('input-group')).toBeTruthy();

		expect( addonL.prop('tagName')).toBeTruthy('SPAN');
		expect( addonL.find('i').hasClass('fa-arrow-left') ).toBeTruthy();
		expect( addonL.text() ).toBeFalsy();

		expect( addonR.prop('tagName')).toBeTruthy('SPAN');
		expect( addonR.find('i').lenght ).toBeFalsy();
		expect( addonR.text() ).toBe('right');
	});
});