'use strict';

describe('emailValidator factory', function() {

	var emailValidator;

	beforeEach(module('jsLib.utils.emailValidator'));

	beforeEach(inject(function( _emailValidator_ ) {
		emailValidator = _emailValidator_;
	}));

	it('should report valid email for valid emails', function() {
		expect(	emailValidator( 'foo@bar.com' ) ).toBe(true);
		expect(	emailValidator( 'foo@bar.c.om' ) ).toBe(true);
		expect(	emailValidator( 'foo@bar.foooo.com' ) ).toBe(true);
		expect(	emailValidator( 'foo.bar@bar.com' ) ).toBe(true);
		expect(	emailValidator( 'foo@bar.co' ) ).toBe(true);
		expect(	emailValidator( 'foo@bar.commmmmmmmmmmmmmm' ) ).toBe(true);
		expect(	emailValidator( 'foo.fofofo@bar.com' ) ).toBe(true);
	});

	it('should report not valid email for emails without to level domain', function() {
		// although it is a valid email, we do not allow
		expect(	emailValidator( 'foo@bar' ) ).toBe(false);
	});

	it('should report not valid email for emails with . simbol in invalid position', function() {
		expect(	emailValidator( '.foo@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'fo..o@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'foo.@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@.bar.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar..com' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar.com.' ) ).toBe(false);
	});

	it('should report not valid email for emails with @ simbol in invalid position', function() {
		expect(	emailValidator( '@foo@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'fo@o@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@@bar.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@ba@r.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar@.com' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar.@com' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar.co@m' ) ).toBe(false);
		expect(	emailValidator( 'foo@bar.com@' ) ).toBe(false);
		expect(	emailValidator( 'foo.bar@' ) ).toBe(false);
		expect(	emailValidator( '@foo.bar.com' ) ).toBe(false);
	});

	it('should report invalid email for emails without @ simbol', function() {
		expect(	emailValidator( 'foo' ) ).toBe(false);
		expect(	emailValidator( 'foo.bar' ) ).toBe(false);
		expect(	emailValidator( 'foo.bar.com' ) ).toBe(false);
	});
});

describe( 'emailValidator Directive', function() {
	var scope, element, $compile;

	beforeEach( module( 'jsLib.utils.emailValidator' ) );
	
	beforeEach(inject(function(_$compile_, _$rootScope_ ){
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	beforeEach(function() {
		var el = angular.element( '<input type="email" ng-model="email" jsw-email/>' );
		element = $compile( el )( scope );
	});

	it( 'shold report valid email for valid email', function() {
		scope.$apply( function(){
			scope.email = 'foo@bar.com';
		});
		expect( element.hasClass( 'ng-invalid-email') ).toBeFalsy();
	});

	it( 'shold report invalid email for invalid email', function() {
		scope.$apply( function(){
			scope.email = 'foo@bar';
		});
		expect( element.hasClass( 'ng-invalid-email') ).toBeTruthy();
	});
});