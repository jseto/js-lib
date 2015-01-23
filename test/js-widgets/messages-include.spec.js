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

	beforeEach( module('jsWidgets.messages') );
	beforeEach( module('jsLib.sprintf') );
	beforeEach( module('ngMessages') );
	
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_ ){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	beforeEach(inject(function($filter) {
		sprintfFilter = $filter('sprintf');
	}));

	beforeEach( function(){
		elmHtml = '<div ng-messages="validationError" jsw-messages-include="errorMessages" template="{{tpl}}"></div>';
		
		scope.errorMessages = {
			minlength: 'minlength {0} message',
			required: 'required message',
			email: 'email message'
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
		elmHtml = '<div ng-messages="validationError" jsw-messages-include="errorMessages" jsw-preprocess-msg="preprocess"></div>';
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

});