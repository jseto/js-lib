'use strict';

describe('jswInput widget', function() {
	var indexPage = require('./index-pageobject.js');

	browser.get('/');

	describe('submit form behaviour', function(){

		describe('when not submitted and pristine', function(){

			it('form is not submitted', function(){
				expect(
					indexPage.form.getAttribute('class')
				).not.toMatch( /\bng-submitted(\s|$)/ );
			});

			it('should not show error alert', function(){
				expect(
					indexPage.email.errorAlert.isPresent()
				).toBeFalsy();
			});

			it('should not show jswMessage', function(){
				expect(
					indexPage.email.jswMessage.isPresent()
				).toBeFalsy();
			});
		});

		describe('when submitted and pristine', function(){
			
			it('form is in submitted state', function(){
				indexPage.submitBtn.click();

				expect(
					indexPage.form.getAttribute('class')
				).toMatch( /\bng-submitted(\s|$)/ );
			});

			it('should show jswMessage', function(){
				expect(
					indexPage.email.jswMessage.isPresent()
				).toBeTruthy();
			});

			it('should show error alert', function(){
				expect(
					indexPage.email.errorAlert.isPresent()
				).toBeTruthy();
			});
		});
	});

	describe('jswInput directive',function(){

		beforeEach(function(){
			indexPage.email.clear();
		});

		it('Should set value and change model', function() {
			indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

			expect(	
				indexPage.email.getAttribute('value') 
			).toBe( 'foo@bar.com' );
			
			expect(	
				indexPage.email.evaluate('user.email') 
			).toBe( 'foo@bar.com' );
		});

		describe('validation panels',function(){
			it('should not show', function(){
				indexPage.mySendKeys( indexPage.email, 'foo@bar.com' );

				expect( 
					indexPage.email.errorAlert.isPresent() 
				).toBe(false);
				expect( 
					indexPage.email.jswMessage.isPresent() 
				).toBe(false);
			});
	
			it('should show validation panels with pattern error message', function(){
				indexPage.username.sendKeys('Joe roe');		
				
				expect( 
					indexPage.username.errorAlert.isPresent()
				).toBeTruthy();
				expect( 
					indexPage.username.errorAlert.getText() 
				).toMatch( 'only one word' );
			});

			it('should show validation panels with minlenght error message', function(){
				indexPage.username.clear();
				indexPage.username.sendKeys('Joe');

				expect(	
					indexPage.username.getAttribute('value') 
				).toBe( 'Joe' );

				indexPage.username.sendKeys( protractor.Key.BACK_SPACE );

				expect( 
					indexPage.username.errorAlert.isPresent()
				).toBeTruthy();

				expect( 
					indexPage.username.errorAlert.getText() 
				).toMatch( 'Ha de tenir 3 caràcters com a mínim' );
			});

			it('should show validation panels with email error message', function(){
				indexPage.mySendKeys( indexPage.email, 'foo@bar.co' );
				indexPage.email.sendKeys( protractor.Key.BACK_SPACE );		
browser.pause()				
				expect( 
					indexPage.email.errorAlert.isPresent()
				).toBeTruthy();
				expect( 
					indexPage.email.jswMessage.isPresent()
				).toBeTruthy();

				expect( 
					indexPage.email.errorAlert.getText() 
				).toMatch( 'L\'adreça de correu no es correcta' );
				expect( 
					indexPage.email.jswMessage.getText() 
				).toMatch( 'L\'adreça de correu no es correcta' );
			});

			it('should hide validation panels after entering correct field', function(){
				indexPage.mySendKeys( indexPage.email, 'foo@bar.co' );

				expect(	// foo@bar.co
					indexPage.email.getAttribute('value') 
				).toBe( 'foo@bar.co' );

				indexPage.email.sendKeys( protractor.Key.BACK_SPACE );

				expect( 
					indexPage.email.errorAlert.isPresent()
				).toBeTruthy();
				expect( 
					indexPage.email.jswMessage.isPresent()
				).toBeTruthy();

				indexPage.email.sendKeys( 'om' );

				expect( 
					indexPage.email.errorAlert.isPresent()
				).toBeFalsy();
				expect( 
					indexPage.email.jswMessage.isPresent()
				).toBeFalsy();
			});
		});	

		describe('ngMessages alert', function(){
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

	describe('jswMissmatch directive', function() {

		it('should be invalid when not match', function() {
			indexPage.username.clear();
			indexPage.username.sendKeys('match_this');
			indexPage.mySendKeys( indexPage.retype, 'match_this but not now');

			expect( 
				indexPage.retype.errorAlert.isPresent()
			).toBeTruthy();
			expect( 
				indexPage.retype.jswMessage.isPresent()
			).toBeTruthy();

			expect( 
				indexPage.retype.errorAlert.getText() 
			).toMatch( 'Els mots de pas no son iguals' );
			expect( 
				indexPage.retype.jswMessage.getText() 
			).toMatch( 'Els mots de pas no son iguals' );
		});

		it('should be valid when match', function() {
			indexPage.retype.clear();
			indexPage.retype.sendKeys('match_this');

			expect( 
				indexPage.retype.errorAlert.isPresent()
			).toBeFalsy();
			expect( 
				indexPage.retype.jswMessage.isPresent()
			).toBeFalsy();
		});
	}); 
});


