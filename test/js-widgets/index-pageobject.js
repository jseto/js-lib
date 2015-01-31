'use strict';

var IndexPageObject = function() {
	this.username = element( by.model( 'user.username' ) );
	this.email =  element( by.model( 'user.email' ) );
	this.retype =  element( by.model( 'retype' ) );
	this.username.errorAlert = element( by.css( 'div[ng-messages="signupForm.username.$error"] > .alert') );
	this.retype.errorAlert = element( by.css( 'div[ng-messages="signupForm.retype.$error"] > .alert') );
	this.retype.jswMessage = element( by.css( 'ng-messages[for="$$__retype__getError()"] > .text-danger' ) );
	this.email.errorAlert = element( by.css( 'div[ng-messages="signupForm.email.$pristine && !signupForm.$submitted? {} : signupForm.email.$error"] > .alert') );
	this.email.jswMessage = element( by.css( 'ng-messages[for="$$__email__getError()"] > .text-danger' ) );
	this.submitBtn = element( by.css( 'button[type="submit"]' ) );
	this.form = element( by.css('form') );

	this.mySendKeys = function( inputEl, str ) {
		//workaround for firefox when jsw-input shows error message
		for ( var i=0; i<str.length; ++i ) {
			inputEl.sendKeys( str[i] );
		}
	};
};

module.exports = new IndexPageObject();