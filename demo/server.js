'use strict';
var express = require('express');
var app = module.exports = express();

var path = require('path');
var clientPath = path.resolve(__dirname, '../demo');

var instant = require('instant');
app.use( instant( clientPath) );

app.all('/*', function(req, res) {
	if ( req.path.indexOf('.') < 0 ) {
  		res.sendFile('index.html',{ root: clientPath });
 	}
 	else {
	  	res.sendStatus(404);
 	}
});

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function(port) {
  // start the web server
  return app.listen(port,function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start(3000);
}
