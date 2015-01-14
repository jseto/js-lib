'use strict';

var indexPage = require('./index-pageobject.js');

browser.get('/');

describe('jswValidateTooltip directive', function(){


	beforeEach(function(){
		indexPage.username.clear();
	});

	it('Should set value and change model', function () {
		indexPage.username.sendKeys('Joe');

		expect(	
			indexPage.username.getAttribute('value') 
		).toBe( 'Joe' );
		
		expect(	
			indexPage.username.evaluate('user.username') 
		).toBe( 'Joe' );
	});

	it('should not show tooltip', function(){
		indexPage.username.sendKeys('Joe');

		expect( 
			element( by.css('.tooltip') ).isPresent() 
		).toBe(false);
	});

	it('should show tooltip with pattern error message', function(){
		indexPage.username.sendKeys('Joe roe');		
		
		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();
		
		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'only1word' );
	});

	it('should show tooltip with minlenght error message', function(){
		indexPage.username.sendKeys('Joe');

		expect(	
			indexPage.username.getAttribute('value') 
		).toBe( 'Joe' );

		indexPage.username.sendKeys( protractor.Key.BACK_SPACE );

		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();

		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'Ha de tenir 3 caràcters com a mínim' );
	});

	it('should show tooltip on blur', function(){
		indexPage.username.sendKeys('Jo');

		indexPage.retype.sendKeys('change focus');

		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();

		indexPage.retype.clear();
	});

	it('should hide tooltip after entering correct field', function(){
		indexPage.username.sendKeys('Joe');

		expect(	
			indexPage.username.getAttribute('value') 
		).toBe( 'Joe' );

		indexPage.username.sendKeys( protractor.Key.BACK_SPACE );

		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();

		indexPage.username.sendKeys('anna');

		expect( 
			indexPage.waitTooltipAbsent()
		).toBeTruthy();
	});


});

describe('jswInput directive',function(){
//TODO: a protractor locator for jswInput to be used like element( by.jswInput( 'my.model.name' ) )

	beforeEach(function(){
		indexPage.email.clear();
	});

	it('Should set value and change model', function () {
		indexPage.email.sendKeys('foo@bar.com');

		expect(	
			indexPage.email.getAttribute('value') 
		).toBe( 'foo@bar.com' );
		
		expect(	
			indexPage.email.evaluate('user.email') 
		).toBe( 'foo@bar.com' );
	});

	it('should not show tooltip', function(){
		indexPage.email.sendKeys('foo@bar.com');

		expect( 
			element( by.css('.tooltip') ).isPresent() 
		).toBe(false);
	});

	it('should show tooltip with email error message', function(){
		indexPage.email.sendKeys( 'foo@bar.co', protractor.Key.BACK_SPACE );		
		
		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();
		
		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'L\'adreça de correu no es correcta' );
	});

	it('should hide tooltip after entering correct field', function(){
		indexPage.email.sendKeys('foo@bar.co');

		expect(	// foo@bar.co
			indexPage.email.getAttribute('value') 
		).toBe( 'foo@bar.co' );

		indexPage.email.sendKeys( protractor.Key.BACK_SPACE );

		expect( // foo@bar.c
			indexPage.waitTooltip()
		).toBeTruthy();

		indexPage.email.sendKeys( 'om' );

		expect( // foo@bar.com
			indexPage.waitTooltipAbsent()
		).toBeTruthy();
	});

});

describe('jswMissmatch directive', function() {

	it('should be invalid when not match', function() {
		indexPage.username.clear();
		indexPage.username.sendKeys('match_this');
		indexPage.retype.sendKeys('match_this but not now');
		expect(
			indexPage.waitTooltip()
		).toBeTruthy();

		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'Els mots de pas no son iguals' );
	});

	it('should be valid when match', function() {
		indexPage.retype.clear();
		indexPage.retype.sendKeys('match_this');
		expect(
			indexPage.waitTooltipAbsent()
		).toBeTruthy();
	});

});