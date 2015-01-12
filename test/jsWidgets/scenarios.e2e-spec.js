'use strict';

var indexPage = require('./index-pageobject.js');

describe('validateTooltip directive', function(){

	browser.get('/');

	beforeEach(function(){
//		indexPage.inputUsername.clear();
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
		expect( 
			element( by.css('.tooltip') ).isPresent() 
		).toBe(false);
	});

	it('should show tooltip with pattern error message', function(){
		indexPage.inputUsername.sendKeys('Joe roe');		
		
		expect( 
			indexPage.tooltip().isDisplayed() 
		).toBe( true );
		
		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'only1word' );
	});

	it('should show tooltip with minlenght error message', function(){
		browser.refresh();
		indexPage.inputUsername.sendKeys('Joe', protractor.Key.BACK_SPACE );		
		
		expect( 
			indexPage.tooltip().isDisplayed() 
		).toBe( true );

		expect( 
			indexPage.tooltip().getText() 
		).toMatch( 'Ha de tenir 3 caràcters com a mínim' );
	});

	it('should hide tooltip after entering correct field', function(){
		browser.refresh();
		indexPage.inputUsername.sendKeys('Joe', protractor.Key.BACK_SPACE);

		browser.wait(function(){
			return element( by.css('.tooltip') ).isPresent();
		});

		indexPage.inputUsername.sendKeys('anna');

		browser.sleep(function(){
			expect( 
				element( by.css('.tooltip-inner') ).isPresent()
			).toBe(false);
		});
	});

});
