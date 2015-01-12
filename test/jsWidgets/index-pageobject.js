'use strict';

var IndexPageObject = function() {
	this.inputUsername = element( by.model('user.username') );
	this.tooltip = function(){
		return element( by.css('.tooltip-inner') );
	};
	// this.homeTab = element( by.id('homeTab') );
	// this.contactTab = element( by.id('contactTab') );
	// this.loginTab = element( by.id('loginTab') );
	// this.logoTab = element( by.id('logoTab') );

	// this.tabActive = /\bactive\b/;
	// this.loginPanel = element( by.id('login') );

	// this.click = function( elem ) {
	// 	elem.element( by.partialLinkText('') ).click();
	// };
};

module.exports = new IndexPageObject();