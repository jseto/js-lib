'use strict';

var waitAbsent = require('../helpers/wait-absent.js');
var waitReady = require('../helpers/wait-ready.js');

var IndexPageObject = function() {
	this.username = element( by.model('user.username') );
	this.email =  element( by.model( 'user.email' ) );
	this.retype =  element( by.model('retype') );

	this.tooltip = function(){
		return element( by.css('.tooltip-inner') );
	};

	this.waitTooltip = function() {
		return this.tooltip().waitReady();
	};

	this.waitTooltipAbsent = function() {
		return this.tooltip().waitAbsent();
	};
};

module.exports = new IndexPageObject();