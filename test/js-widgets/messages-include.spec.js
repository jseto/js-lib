'use strict';

describe('jswMessagesInclude directive', function() {
	var scope, element, $compile, elmHtml, sprintfFilter;

	var compile = function( scope, html ) {
		// Compile a piece of HTML containing the directive
		var el = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return el;
	};

	beforeEach( function(){
		module('jsLib.widgets.messages');
		module('jsLib.utils.sprintf');
		module('ngMessages');
	});
	
	beforeEach(inject(function(_$compile_, _$rootScope_ ){
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	beforeEach(inject(function($filter) {
		sprintfFilter = $filter('sprintf');
	}));

	beforeEach( function(){
		elmHtml = [
			'<div ',
			'	ng-messages=\"validationError\"',
			'	jsw-messages-include=\"errorMessages\" ',
			'	jsw-override-messages=\"{ pattern: \'overriden pattern message\' }\"',
			'	jsw-message-template=\"{{tpl}}\">',
			'</div> ',
		''].join('\n');		

		scope.errorMessages = {
			minlength: 'minlength {0} message',
			required: 'required message',
			email: 'email message',
			pattern: 'regular pattern message'
		};

		element = compile(scope, elmHtml);
	});

	it('matches errors with messages', function() {
		scope.$apply( function() {
			scope.validationError = { 'minlength' : true };
		});

		var childText = element.children().text();
		expect(	childText ).toBe( 'minlength {0} message' );

		scope.$apply( function() {
			scope.validationError = { 'required': true };
		});

		childText = element.children().text();
		expect(	childText ).toBe( 'required message' );
	});

	it('uses template', function() {
		scope.tpl = '<p></p>';
		scope.validationError = { 'minlength' : true };
		element = compile( scope, elmHtml );

		var child = element.find('p');
		expect( child.length ).toBeTruthy();
	});

	it('preprocesses error messages', function(){
		elmHtml = [
			'<div ',
			'	ng-messages=\"validationError\" ',
			'	jsw-messages-include=\"errorMessages\" ',
			'	jsw-preprocess-messages=\"preprocess\">',
			'</div>',
			''].join('\n');		

		scope.validationError = { 'minlength' : true };

		scope.preprocess = function( key, message ) {
			if ( key === 'minlength' ) { 
				return sprintfFilter( message, [3] );
			}
			return message;
		};

		element = compile(scope, elmHtml);

		var childText = element.children().text();
		expect(	childText ).toBe( 'minlength 3 message' );
	});

	it('overrides error messages', function(){
		scope.$apply( function() {
			scope.validationError = { 'pattern' : true };
		});

		var childText = element.children().text();
		expect(	childText ).toBe( 'overriden pattern message' );

		scope.$apply( function() {
			scope.validationError = { 'required': true };
		});

		childText = element.children().text();
		expect(	childText ).toBe( 'required message' );

	});

});