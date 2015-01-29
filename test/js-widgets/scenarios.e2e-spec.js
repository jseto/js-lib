'use strict';

var indexPage = require('./index-pageobject.js');

browser.get('/');

xdescribe('jswValidateTooltip directive', function(){


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

	beforeEach(function(){
		indexPage.email.clear();
	});

	xit('Should set value and change model', function() {
		indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

		expect(	
			indexPage.email.getAttribute('value') 
		).toBe( 'foo@bar.com' );
		
		expect(	
			indexPage.email.evaluate('user.email') 
		).toBe( 'foo@bar.com' );
	});

	xdescribe('tooltip',function(){
		it('should not show tooltip', function(){
			indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

			expect( 
				element( by.css('.tooltip') ).isPresent() 
			).toBe(false);
		});

		it('should show tooltip with email error message', function(){
			indexPage.mySendKeys( indexPage.email, 'foo@bar.co' );
			indexPage.email.sendKeys( protractor.Key.BACK_SPACE );		
			
			expect( 
				indexPage.waitTooltip()
			).toBeTruthy();
			
			expect( 
				indexPage.tooltip().getText() 
			).toMatch( 'L\'adreça de correu no es correcta' );
		});

		it('should hide tooltip after entering correct field', function(){
			indexPage.mySendKeys( indexPage.email, 'foo@bar.co' );

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

	xdescribe('ngMessages alert', function(){
		it('should not show messages when untouched', function(){
			expect( 
				indexPage.email.errorAlert.isPresent() 
			).toBeFalsy();
		});

		it('should show messages when email error', function(){
			indexPage.mySendKeys( indexPage.email, 'foo' );

			expect( 
				indexPage.email.errorAlert.isPresent() 
			).toBeTruthy();

			expect( 
				indexPage.email.errorAlert.getText() 
			).toBe('L\'adreça de correu no es correcta');
		});

		it('should show minlength error message', function(){
			indexPage.mySendKeys( indexPage.email, 'f@b.co' );
			
			expect( 
				indexPage.email.errorAlert.isPresent() 
			).toBeTruthy();

			expect( 
				indexPage.email.errorAlert.getText() 
			).toBe('Ha de tenir 8 caràcters com a mínim');
		});

		it('should hide alert after entering correct field', function(){
			indexPage.email.clear();
			indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

			expect( 
				indexPage.email.errorAlert.isPresent() 
			).toBeFalsy();
		});
	});

	describe('jswMessage', function(){
		indexPage.email.clear();

		it('should not show messages when untouched', function(){
			expect( 
				indexPage.email.jswMessage.isPresent() 
			).toBeFalsy();
		});

		it('should show messages when email error', function(){
			indexPage.mySendKeys( indexPage.email, 'foo' );

			expect( 
				indexPage.email.jswMessage.isPresent() 
			).toBeTruthy();

			expect( 
				indexPage.email.jswMessage.getText() 
			).toBe('L\'adreça de correu no es correcta');
		});

		it('should show minlength error message', function(){
			indexPage.mySendKeys( indexPage.email, 'f@b.co' );
			
			expect( 
				indexPage.email.jswMessage.getText() 
			).toBe('Ha de tenir 8 caràcters com a mínim');
		});

		it('should hide messages after entering correct field', function(){
			indexPage.email.clear();
			indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

			expect( 
				indexPage.email.jswMessage.isPresent() 
			).toBeFalsy();
		});
	});
});

xdescribe('jswMissmatch directive', function() {

	it('should be invalid when not match', function() {
		indexPage.username.clear();
		indexPage.username.sendKeys('match_this');
		indexPage.mySendKeys( indexPage.retype, 'match_this but not now');
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