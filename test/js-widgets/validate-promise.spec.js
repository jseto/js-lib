'use strict';

describe('jswValidatePromise directive', function() {
	var element, scope, $compile, httpBackend, $http, $q;

	var compile = function( scope, html ) {
		// Compile a piece of HTML containing the directive
		element = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return element;
	};

	beforeEach( module('jsWidgets.validatePromise') );
	
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$http_, _$q_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
		httpBackend = _$httpBackend_;
		$http = _$http_;
		$q = _$q_;

		httpBackend
			.when('GET', '/api/user/joe')
			.respond({username: 'joe', otherUserFields: true });

		httpBackend
			.when('GET', '/api/user/bar')
			.respond(404);
	}));

	beforeEach( function(){
		var elmHtml = '<input jsw-validate-promise="uniqueUserPromise" ng-model="model">';
		scope.uniqueUserPromise = function( value ){
			if ( !value ) return $q.reject('empty');
			return $http.get('/api/user/' + value ).then( 
						function resolved() {
							//username exists, this means validation fails
							return $q.reject('exists');
						},
						function rejected() {
							//hey! user does not exists, then validation is ok
							return true;
						});
		};
		element = compile(scope, elmHtml);
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('puts invalid state because user exists', function() {

		scope.$apply( function() {
			scope.model = 'joe';
		});

		httpBackend.flush();

		expect(	element.hasClass('ng-valid') ).toBe(false);
		expect(	element.hasClass('ng-invalid') ).toBe(true);
	});

	it('puts valid state because user does NOT exists', function() {

		scope.$apply( function() {
			scope.model = 'bar';
		});

		httpBackend.flush();

		expect(	element.hasClass('ng-valid') ).toBe(true);
		expect(	element.hasClass('ng-invalid') ).toBe(false);
	});


});