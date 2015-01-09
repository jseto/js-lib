'use strict';
var express = require('express');
var app = module.exports = express();

var path = require('path');
var clientPath = path.resolve(__dirname, '../');

var instant = require('instant');
app.use( instant( clientPath + '/lib' ) );
app.use( instant( clientPath + '/demo' ) );

app.start = function(port) {
  // start the web server
  return app.listen(port,function() {
    console.log('Web server listening at: %s', port);
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start(3000);
}
