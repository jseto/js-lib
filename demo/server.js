'use strict';
var express = require('express');
var app = module.exports = express();

var path = require('path');
var clientPath = path.resolve(__dirname, '../');

var inst = require('instant');
var instant = inst();
app.use( '/lib', instant.add( clientPath + '/lib' ) );
app.use( instant.add( clientPath + '/demo' ) );

var instance = null;

app.start = function(port, callback) {
  port = port || 3000;
  // start the web server
  instance = app.listen(port,function( result ) {
    console.log('Web server listening at: %s', port);
    if (callback) {
    	callback( result );
    }
  });
  return instance;
};

app.stop = function(){
	if (instance){
		console.log('Shutting down web server');
		instance.close();
	}
	else { 

		throw 'instance is null';
	}
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start(3000);
}
