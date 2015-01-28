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

	beforeEach( module('jsLib.widgets.input') );
	// beforeEach( module('jsWidgets.messages') );
	// beforeEach( module('ngMessages') );
	
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	var findRootParent = function( element ){
		var parent = element.parent();
		while( parent.length && !parent.hasClass('form-group') ){
			parent = parent.parent();
		}
		return parent;
	};

	var checkBasics = function( inputElm ) {
		expect( inputElm.hasClass('jsw-input')).toBeFalsy();
		expect( inputElm.attr('name') ).toBe('test');
		expect( inputElm.attr('type') ).toBe('text');
		expect( inputElm.attr('placeholder') ).toBe('placeholder for test');
		expect( inputElm.attr('ng-model') ).toBe('model');
		expect( inputElm.hasClass('form-control')).toBeTruthy();
		expect( inputElm.prop('tagName') ).toBe('INPUT');
	};

	it('has basic attributes and classes when declared in class', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input"',
				'	name="test"',
				'	type="text"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	/>',
				''].join('\n');
		var el = findRootParent( compile( scope, elmHtml ) );
		var input = el.children();

		checkBasics( input );
		expect(	el.hasClass('form-group') ).toBeTruthy();
	});

	it('has basic attributes and classes when declared in attribute', function() {
		var elmHtml = [
				'<input ',
				'	jsw-input',
				'	name="test"', 
				'	type="text"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	/>',
				''].join('\n');
		var el = findRootParent( compile( scope, elmHtml ) );
		var input = el.children();

		checkBasics( input );
		expect(	el.hasClass('form-group') ).toBeTruthy();
	});

	it('has external decorators', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input" ',
				'	name="test"',
				'	type="text"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	label="testLabel" ',
				'	help-block="help for test"',
				'	/>',
				''].join('\n');
		var el = findRootParent( compile( scope, elmHtml ) );

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

	it('has internal decorators', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input" ',
				'	name="test"',
				'	type="text"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	icon-l="fa fa-arrow-left"',
				'	addon-r="right"',
				'	/>',
				''].join('\n');

		var el = findRootParent( compile( scope, elmHtml ) );
		var divInputGroup = el.children().first();
		var addonL = divInputGroup.children().first();
		var input = addonL.next();
		var addonR = input.next();

		checkBasics( input );

		expect(	el.hasClass('form-group') ).toBeTruthy();
		expect( divInputGroup.hasClass('input-group')).toBeTruthy();

		expect( addonL.prop('tagName')).toBe('SPAN');
		expect( addonL.find('i').hasClass('fa-arrow-left') ).toBeTruthy();
		expect( addonL.text() ).toBeFalsy();

		expect( addonR.prop('tagName')).toBe('SPAN');
		expect( addonR.find('i').lenght ).toBeFalsy();
		expect( addonR.text() ).toBe('right');
	});

	it('has internal with external decorators', function() {
		var elmHtml = [
				'<input ',
				'	class="jsw-input" ',
				'	name="test"',
				'	type="text"',
				'	placeholder="placeholder for test"',
				'	ng-model="model"',
				'	label="testLabel"',
				'	help-block="help for test"',
				'	icon-l="fa fa-arrow-left"',
				'	addon-r="right"',
				'	/>',
				''].join('\n');

		var el = findRootParent( compile( scope, elmHtml ) );

		var label = el.children().first();
		var divInputGroup = label.next();
		var addonL = divInputGroup.children().first();
		var input = addonL.next();
		var addonR = input.next();
		var helpBlock = el.children().last();

		checkBasics( input );

		expect(	el.hasClass('form-group') ).toBeTruthy();
		expect( divInputGroup.hasClass('input-group')).toBeTruthy();

		expect( addonL.prop('tagName')).toBe('SPAN');
		expect( addonL.find('i').hasClass('fa-arrow-left') ).toBeTruthy();
		expect( addonL.text() ).toBeFalsy();

		expect( addonR.prop('tagName')).toBe('SPAN');
		expect( addonR.find('i').lenght ).toBeFalsy();
		expect( addonR.text() ).toBe('right');

		expect( label.prop('tagName') ).toBe('LABEL');
		expect( helpBlock.hasClass('help-block')).toBeTruthy(); 

		expect( label.html() ).toBe('testLabel');
		expect( helpBlock.html() ).toBe('help for test');
	});


	describe('Form validators', function() {

		// beforeEach( module('jsWidgets.messages') );
		// beforeEach( module('ngMessages') );

		it('does not produce errors', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input"',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		/>',
					'</form>',
					''].join('\n');
			compile( scope, elmHtml );

			expect(	scope.testForm.test.$error ).toEqual({});
		});

		it('responds to required error', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input"',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');
			compile( scope, elmHtml );

			expect(	scope.testForm.test.$error.required ).toBeTruthy();
			scope.$apply(function(){
				scope.model='ok';
			});
			expect(	scope.testForm.test.$error.required ).toBeFalsy();
		});

		it('responds to required and minlength error', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input"',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		minlength="3"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');
			compile( scope, elmHtml );

			expect(	scope.testForm.test.$error.required ).toBeTruthy();
			expect(	scope.testForm.test.$error.minlength ).toBeFalsy();
			scope.$apply(function(){
				scope.model='ok';
			});

			expect(	scope.testForm.test.$error.required ).toBeFalsy();
			expect(	scope.testForm.test.$error.minlength ).toBeTruthy();
		});
	});

	describe('uses jsw-messages', function(){
		it('has messages directive and shows no error', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		placeholder="placeholder for test"',
					'		ng-model="model"',
					'		label="testLabel"',
					'		help-block="help for test"',
					'		icon-l="fa fa-arrow-left"',
					'		addon-r="right"',
					'		jsw-messages="{minlength:\'minlength message\'", required::\'required message\'"}',
					'		/>',
					'</form>',
					''].join('\n');

			var el = compile( scope, elmHtml ).children().first();

			var label = el.children().first();
			var divInputGroup = label.next();
			var addonL = divInputGroup.children().first();
			var input = addonL.next();
			var addonR = input.next();
			var helpBlock = el.children().last();
			var messages = helpBlock.prev();

			checkBasics( input );
 
			expect(	el.hasClass('form-group') ).toBeTruthy();
			expect( divInputGroup.hasClass('input-group')).toBeTruthy();
			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');

			expect( addonL.prop('tagName')).toBe('SPAN');
			expect( addonL.find('i').hasClass('fa-arrow-left') ).toBeTruthy();
			expect( addonL.text() ).toBeFalsy();

			expect( addonR.prop('tagName')).toBe('SPAN');
			expect( addonR.find('i').lenght ).toBeFalsy();
			expect( addonR.text() ).toBe('right');

			expect( label.prop('tagName') ).toBe('LABEL');
			expect( helpBlock.hasClass('help-block')).toBeTruthy(); 

			expect( label.html() ).toBe('testLabel');
			expect( helpBlock.html() ).toBe('help for test');

			expect( messages.children().length ).toBe(0);
		});

		xit('shows required error', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		jsw-messages="validationMessages"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');

			scope.validationMessages = {
				minlength: 'minlength message',
				required: 'required message'
			};
			var el = compile( scope, elmHtml ).children().first();
			var messages = el.children().last();

			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');

			expect(	scope.testForm.test.$error.required ).toBeTruthy();
			expect( messages.children().length ).toBeGreaterThan(0);
			expect( messages.children().attr('ng-message') ).toBe('required');
		});

		xit('shows minlength error', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		jsw-messages="validationMessages"',
					'		minlength="3"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');

			scope.validationMessages = {
				minlength: 'minlength message',
				required: 'required message'
			};
			scope.model='a';
			var el = compile( scope, elmHtml ).children().first();
			var messages = el.children().last();

			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');

			expect(	scope.testForm.test.$error.required ).toBeFalsy();
			expect(	scope.testForm.test.$error.minlength ).toBeTruthy();
			expect( messages.children().length ).toBeGreaterThan(0);
			expect( messages.children().attr('ng-message') ).toBe('minlength');
		});

	});
});