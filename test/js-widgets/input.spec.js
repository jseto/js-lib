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

	beforeEach( function() {
		module('jsLib.widgets.input');
		module('jsLib.widgets');
		module('ngMessages');
	});

	beforeEach(inject(function(_$compile_, _$rootScope_){
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

	it('has basic attributes and classes when declared as class', function() {
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

	it('has basic attributes and classes when declared as attribute', function() {
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

		it('does not set errors when no error', function() {
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

		it('reacts to required error', function() {
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

		it('reacts to required and minlength error', function() {
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

	describe('with jsw-messages', function(){
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
					'		jsw-messages="{minlength:\'minlength message\', required:\'required message\'}"',
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

		describe('working with required error', function() {
			var el, messages;

			beforeEach( function() {
				var elm = angular.element([
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
						''].join('\n'));

				scope.validationMessages = {
					minlength: 'minlength message',
					required: 'required message'
				};
				el = compile( scope, elm ).children().first();
				messages = el.children().last();
			});

			it('has required error', function() {
				expect(	scope.testForm.test.$error.required ).toBeTruthy();
			});

			it('does not show error before submit', function() {
				expect( messages.children().length ).toBe( 0 );
			});

			it('does shows error after submit', function() {
				scope.$apply( function(){
					scope.testForm.$setSubmitted(); 
				});

				expect( messages.children().length ).toBeGreaterThan(0);
				expect( messages.children().attr('ng-message') ).toBe('required');
				expect( messages.children().html() ).toBe('required message');
			});
		});

		it('working with minlength error', function() {
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
				minlength: 'minlength is {0} message',
				required: 'required message'
			};
			var el = compile( scope, elmHtml ).children().first();
			scope.testForm.test.$setViewValue('aa');

			var messages = el.children().last();

			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');

			expect(	scope.testForm.test.$error.required ).toBeFalsy();
			expect(	scope.testForm.test.$error.minlength ).toBeTruthy();
			expect( scope.$$__test__preprocess ).toBeTruthy();

			expect( messages.children().length ).toBeGreaterThan(0);
			expect( messages.children().attr('ng-message') ).toBe('minlength');
			expect( messages.children().html() ).toBe('minlength is 3 message');
		});

		it('has preprocess message function', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		jsw-messages="validationMessages"',
					'		minlength="3"',
					'		maxlength="8"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');
			scope.validationMessages = {
				minlength: 'minimum length is {0} chars',
				maxlength: 'maximum length is {0} chars',
				required: 'required message'
			};
			var el = compile( scope, elmHtml ).children().first();
			var messages = el.children().last();

			expect( scope.$$__test__preprocess ).toBeTruthy();

			scope.testForm.test.$setViewValue('a');
			expect( 
				messages.children().html()
			 ).toBe( 'minimum length is 3 chars' );

			scope.testForm.test.$setViewValue('a123456789');
			expect( 
				messages.children().html()
			 ).toBe( 'maximum length is 8 chars' );
		});

		it('behaves well with preprocess message function for ng-minlength and ng-maxlenght tag', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		jsw-messages="validationMessages"',
					'		data-ng-minlength="3"',
					'		ng-maxlength="8"',
					'		required',
					'		/>',
					'</form>',
					''].join('\n');
			scope.validationMessages = {
				minlength: 'minimum length is {0} chars',
				maxlength: 'maximum length is {0} chars',
				required: 'required message'
			};
			var el = compile( scope, elmHtml ).children().first();
			var messages = el.children().last();

			scope.testForm.test.$setViewValue('a');
			expect( 
				messages.children().html()
			 ).toBe( 'minimum length is 3 chars' );

			scope.testForm.test.$setViewValue('a123456789');
			expect( 
				messages.children().html()
			 ).toBe( 'maximum length is 8 chars' );
		});
	});

	describe( 'behaves well without form tag nor some attributes', function() {
		it('cannot show error without form tag but does not throw', function() {
			var elmHtml = [
					'<div>',
					'	<input ',
					'		class="jsw-input" ',
					'		name="test"',
					'		type="text"',
					'		ng-model="model"',
					'		jsw-messages="validationMessages"',
					'		required',
					'		/>',
					'</div>',
					''].join('\n');

			scope.validationMessages = {
				minlength: 'minlength message',
				required: 'required message'
			};
			var el = compile( scope, elmHtml ).children().first();
			var messages = el.children().last();

			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');

			expect(	scope.$$__test__getError() ).toEqual({});
		});

		it('does not throw without name attribute', function() {
			var elmHtml = [
					'<form name="testForm" novalidate>',
					'	<input ',
					'		class="jsw-input" ',
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

			scope.$apply( function(){
				scope.testForm.$setSubmitted();
			});

			expect( messages.prop('tagName') ).toBe('NG-MESSAGES');
			expect(	messages.children().length ).toBe(0);
		});
	});

	describe('field validation', function() {
		var elementHtml = [
					'<input ',
					'	type="text"',
					'	class="form-control" ',
					'	placeholder="user name" ',
					'	ng-model="user.username"',
					'	ng-minlength=3',
					'	ng-pattern="/^\\s*\\w*\\s*$/"',
					'	ng-pattern-error-message="validationError.only1word"',
					' 	jsw-missmatch="\'frank\'"',
					'	required>',
			].join('\n');

		it('element has proper style classes', function() {
			var element = compile( scope, elementHtml );
			expect( scope.user ).toBeUndefined();
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

		it('gets the valid state', function() {
			scope.user = { username : 'frank' };
			var element = compile( scope, elementHtml );

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

		it('gets the invalid state because minlenght and missmatch', function() {
			scope.user = { username : 'fr' };
			var element = compile( scope, elementHtml );

			expect(	element.hasClass('ng-valid') ).toBe(false);
			expect(	element.hasClass('ng-invalid') ).toBe(true);

			expect(	element.hasClass('ng-valid-minlength') ).toBe(false);
			expect(	element.hasClass('ng-invalid-minlength') ).toBe(true);

			expect(	element.hasClass('ng-valid-jsw-missmatch') ).toBe(false);
			expect(	element.hasClass('ng-invalid-jsw-missmatch') ).toBe(true);
		});

		it('gets the valid state because missmatch with scope var', function() {
			scope.user = { username : 'frank' };
			scope.toCompare = 'frank';
			var element = compile( scope, elementHtml.replace('user.username == \'frank\'', 'user.username == toCompare') );

			expect(	element.hasClass('ng-valid') ).toBe(true);
			expect(	element.hasClass('ng-invalid') ).toBe(false);

			expect(	element.hasClass('ng-valid-jsw-missmatch') ).toBe(true);
			expect(	element.hasClass('ng-invalid-jsw-missmatch') ).toBe(false);
		});

		it('gets the invalid state because pattern', function() {
			scope.user = { username : 'frank de la jungla' };
			var element = compile( scope, elementHtml );

			expect(	element.hasClass('ng-valid') ).toBe(false);
			expect(	element.hasClass('ng-invalid') ).toBe(true);

			expect(	element.hasClass('ng-valid-pattern') ).toBe(false);
			expect(	element.hasClass('ng-invalid-pattern') ).toBe(true);
		});
	});

});