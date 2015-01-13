'use strict';

describe('emailValidator', function() {

	var emailValidatorFilter;

	beforeEach(module('jsLib.emailValidator'));
	beforeEach(inject(function($filter) {
		emailValidatorFilter = $filter('emailValidator');
	}));

	it('should report valid email for valid emails', function() {
		expect(	emailValidatorFilter( 'foo@bar.com' ) ).toBe(true);
		expect(	emailValidatorFilter( 'foo@bar.c.om' ) ).toBe(true);
		expect(	emailValidatorFilter( 'foo@bar.foooo.com' ) ).toBe(true);
		expect(	emailValidatorFilter( 'foo.bar@bar.com' ) ).toBe(true);
		expect(	emailValidatorFilter( 'foo@bar.co' ) ).toBe(true);
		expect(	emailValidatorFilter( 'foo@bar.commmmmmmmmmmmmmm' ) ).toBe(true);
	});

	it('should report not valid email for emails with . simbol in invalid position', function() {
		expect(	emailValidatorFilter( '.foo@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'fo..o@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo.@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@.bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar..com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar.com.' ) ).toBe(false);
	});

	it('should report not valid email for emails with @ simbol in invalid position', function() {
		expect(	emailValidatorFilter( '@foo@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'fo@o@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@@bar.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@ba@r.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar@.com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar.@com' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar.co@m' ) ).toBe(false);
		expect(	emailValidatorFilter( 'foo@bar.com@' ) ).toBe(false);
	});

});