'use strict';

/**
*  Module pt.dateConverter
*
*/

angular.module('jsUtils.dateConverter', [

])

.factory('dateConverter', function(){

	var internalDate = new Date();
	var day, month, year;

	// function localeToNG( locale ){
	// 	for ( i = 0; i<locale.length; ++i){
	// 		if ( locale.charAt(i) == 'm' ){
	// 			locale.charAt(i).toUpperCase();
	// 		}
	// 	}
	// 	return locale;
	// }

	function setDay( date, locale ){
		var datePos = locale.indexOf('D');
		day = +date.slice(datePos,datePos+2);
		internalDate.setDate( day );
	}

	function setMonth( date, locale ){
		var datePos = locale.indexOf('M');
		month = +date.slice(datePos,datePos+2);
		internalDate.setMonth( month - 1 );
	}

	function setYear( date, locale ){
		var datePos = locale.indexOf('YYYY');

		if ( datePos>=0 ){
			year = date.slice(datePos,datePos+4);
		}
		else {
			datePos = locale.indexOf('Y');
			year = +( '20' + date.slice(datePos,datePos+2) );
		}

		internalDate.setFullYear( year );
	}

	function insertSeparator( date, locale ){
		var hasSeparator = date.indexOf('/')>=0 || date.indexOf('-')>=0;
		var localeHasSeparator = locale.indexOf('/')>=0 || locale.indexOf('-')>=0;

		if ( !hasSeparator && localeHasSeparator ){
			var newDate = '';
			var dateIndex = 0;
			for (var i = 0; i<locale.length; i++) {
				if ( locale.charAt( i ) == '-' || locale.charAt( i ) == '/' ) {
					newDate += locale.charAt( i );
				}
				else {
					newDate += date.charAt( dateIndex++ );
				}
			}
			return newDate;
		}
		else {
			return date;
		}
	}
	
	/* a = number to convert, b leading zeros required */ 
	function leadingZeros(a,b){return(1e15+a+"").slice(-b)}
	
	return {
		setDate: function( date, plocale ){
			if ( date instanceof Date ){
				internalDate = new Date(date);
				day = date.getDate();
				month = date.getMonth()+1;
				year = date.getFullYear();
				return this;
			}

			if ( !date || !date.length ) {
				internalDate = new Date('');
				return this;
			}

			var locale = plocale.toUpperCase();

			var d = insertSeparator( date, locale );

			setYear( d, locale );
			setMonth( d, locale );
			setDay( d, locale );
			return this;
		},

		toDate: function(){
			if ( !this.isValid() ) return null;
			return internalDate;
		},

		isValid: function() {
			return internalDate != 'Invalid Date'
				&& internalDate.getDate() == day
				&& internalDate.getMonth() == month - 1
				&& internalDate.getFullYear() == year;
		},

		getDate: function( plocale ){
			if ( !this.isValid() ) return null;

			var locale = plocale.toUpperCase();
			var dateStr = '';
			var currentChar = 0;
			
			while ( currentChar < locale.length ){

				switch( locale.charAt( currentChar ) ){
					case 'D':
						dateStr += leadingZeros( internalDate.getDate(), 2);
						currentChar += 2;
						break;
					case 'M':
						dateStr += leadingZeros( internalDate.getMonth()+1, 2);
						currentChar += 2;
						break;
					case 'Y':
						if ( locale.indexOf('YYYY') >= 0 ) {
							dateStr += leadingZeros( internalDate.getFullYear(), 4);
							currentChar += 4;
						}
						else{
							dateStr += (''+leadingZeros( internalDate.getFullYear()).slice(2,4), 2)
							currentChar += 2;
						}
						break;
					default:
						throw 'Incorrect locale string';
				}

				var separator = locale.charAt( currentChar );
				if (  separator == '/' || separator == '-' ){
					currentChar++;
					dateStr += separator;
				}

			}
			return dateStr;
		}
	}
})

;