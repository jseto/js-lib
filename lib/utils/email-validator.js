'use strict';

angular.module('jsLib.utils.emailValidator',[
])

.filter('emailValidator', function(){
  return function( value ) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;: @\"]+(\.[^<>()[\]\\.,;: @\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test( value );
  };
});