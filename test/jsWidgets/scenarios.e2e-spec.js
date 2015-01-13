'use strict';

var indexPage = require('./index-pageobject.js');

browser.get('/');

describe('jswValidateTooltip directive', function(){


	beforeEach(function(){
		indexPage.inputUsername.clear();
	});

	it('Should set value and change model', function () {
		indexPage.inputUsername.sendKeys('Joe');

		expect(	
			indexPage.inputUsername.getAttribute('value') 
		).toBe( 'Joe' );
		
		expect(	
			indexPage.inputUsername.evaluate('user.username') 
		).toBe( 'Joe' );
	});

	it('should not show tooltip', function(){
		indexPage.inputUsername.sendKeys('Joe');

		expect( 
			element( by.css('.tooltip') ).isPresent() 
		).toBe(false);
	});

	it('should show tooltip with pattern error message', function(){
		indexPage.inputUsername.sendKeys('Joe roe');		
		
		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();
		
		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'only1word' );
	});

	it('should show tooltip with minlenght error message', function(){
		indexPage.inputUsername.sendKeys('Joe');

		expect(	
			indexPage.inputUsername.getAttribute('value') 
		).toBe( 'Joe' );

		indexPage.inputUsername.sendKeys( protractor.Key.BACK_SPACE );

		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();

		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'Ha de tenir 3 caràcters com a mínim' );
	});

	it('should hide tooltip after entering correct field', function(){
		indexPage.inputUsername.sendKeys('Joe');

		expect(	
			indexPage.inputUsername.getAttribute('value') 
		).toBe( 'Joe' );

		indexPage.inputUsername.sendKeys( protractor.Key.BACK_SPACE );

		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();

		indexPage.inputUsername.sendKeys('anna');

		expect( 
			indexPage.waitTooltipAbsent()
		).toBeTruthy();
	});

});

describe('jswInput directive',function(){
//TODO: a protractor locator for jswInput to be used like element( by.jswInput( 'my.model.name' ) )

	beforeEach(function(){
		indexPage.inputEmail.clear();
	});

	it('Should set value and change model', function () {
		indexPage.inputEmail.sendKeys('foo@bar.com');

		expect(	
			indexPage.inputEmail.getAttribute('value') 
		).toBe( 'foo@bar.com' );
		
		expect(	
			indexPage.inputEmail.evaluate('user.email') 
		).toBe( 'foo@bar.com' );
	});

	it('should not show tooltip', function(){
		indexPage.inputEmail.sendKeys('foo@bar.com');

		expect( 
			element( by.css('.tooltip') ).isPresent() 
		).toBe(false);
	});

	it('should show tooltip with email error message', function(){
		indexPage.inputEmail.sendKeys( 'foo@bar.co', protractor.Key.BACK_SPACE );		
		
		expect( 
			indexPage.waitTooltip()
		).toBeTruthy();
		
		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'L\'adreça de correu no es correcta' );
	});

	it('should hide tooltip after entering correct field', function(){
		indexPage.inputEmail.sendKeys('foo@bar.co');

		expect(	// foo@bar.co
			indexPage.inputEmail.getAttribute('value') 
		).toBe( 'foo@bar.co' );

		indexPage.inputEmail.sendKeys( protractor.Key.BACK_SPACE );

		expect( // foo@bar.c
			indexPage.waitTooltip()
		).toBeTruthy();

		indexPage.inputEmail.sendKeys( 'om' );

		expect( // foo@bar.com
			indexPage.waitTooltipAbsent()
		).toBeTruthy();
	});

});
