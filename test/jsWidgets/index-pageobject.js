'use strict';

var waitAbsent = require('../helpers/waitAbsent.js');
var waitReady = require('../helpers/waitReady.js');

var IndexPageObject = function() {
	this.username = element( by.model('user.username') );
	this.email =  element( by.css('input[ng-model="user.email"]') );
	this.retype =  element( by.css('input[ng-model="retype"]') );

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