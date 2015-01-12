'use strict';

var indexPage = require('./index-pageobject.js');

describe('jswValidateTooltip directive', function(){

	browser.get('/');

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

xdescribe('jswInput directive',function(){

});
