'use strict';

describe('DateConverter Service', function(){
	
	var dateConverter;

	beforeEach(function(){
		module('jsLib.utils.dateConverter');

		inject(function($injector) {
    		dateConverter = $injector.get('dateConverter');
		});
	});

	it('sets a date with a date object', function(){
		dateConverter.setDate( new Date( 19959250125 ) );
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1970-08-20');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('08-20-1970');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('20-08-1970');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1970/08/20');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('08/20/1970');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('20/08/1970');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19700820');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('08201970');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('20081970');
	});

	it('sets a date with locale YYYY-MM-DD', function(){
		dateConverter.setDate('1995-07-25', 'YYYY-MM-DD');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1995-07-25');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('07-25-1995');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('25-07-1995');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1995/07/25');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('07/25/1995');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('25/07/1995');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19950725');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('07251995');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('25071995');
	});

	it('sets a date with lowercase locale yyyy-mm-dd', function(){
		dateConverter.setDate('1995-10-02', 'yyyy-mm-dd');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('yyyy-mm-dd') ).toEqual('1995-10-02');
		expect( dateConverter.getDate('mm-dd-yyyy') ).toEqual('10-02-1995');
		expect( dateConverter.getDate('dd-mm-yyyy') ).toEqual('02-10-1995');
		expect( dateConverter.getDate('yyyy/mm/dd') ).toEqual('1995/10/02');
		expect( dateConverter.getDate('mm/dd/yyyy') ).toEqual('10/02/1995');
		expect( dateConverter.getDate('dd/mm/yyyy') ).toEqual('02/10/1995');
		expect( dateConverter.getDate('yyyymmdd') ).toEqual('19951002');
		expect( dateConverter.getDate('mmddyyyy') ).toEqual('10021995');
		expect( dateConverter.getDate('ddmmyyyy') ).toEqual('02101995');
	});

	it('sets a date with locale DD-MM-YYYY', function(){
		dateConverter.setDate('25-10-1995', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1995-10-25');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('10-25-1995');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('25-10-1995');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1995/10/25');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('10/25/1995');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('25/10/1995');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19951025');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('10251995');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('25101995');
	});

	it('sets a date with locale MM-DD-YYYY', function(){
		dateConverter.setDate('10-25-1995', 'MM-DD-YYYY');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1995-10-25');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('10-25-1995');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('25-10-1995');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1995/10/25');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('10/25/1995');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('25/10/1995');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19951025');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('10251995');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('25101995');
	});

	it('sets a date with locale DDMMYYYY', function(){
		dateConverter.setDate('25101995', 'DDMMYYYY');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1995-10-25');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('10-25-1995');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('25-10-1995');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1995/10/25');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('10/25/1995');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('25/10/1995');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19951025');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('10251995');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('25101995');
	});

	it('sets a date with locale DD-MM-YYYY but without separator', function(){
		dateConverter.setDate('25101995', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.getDate('YYYY-MM-DD') ).toEqual('1995-10-25');
		expect( dateConverter.getDate('MM-DD-YYYY') ).toEqual('10-25-1995');
		expect( dateConverter.getDate('DD-MM-YYYY') ).toEqual('25-10-1995');
		expect( dateConverter.getDate('YYYY/MM/DD') ).toEqual('1995/10/25');
		expect( dateConverter.getDate('MM/DD/YYYY') ).toEqual('10/25/1995');
		expect( dateConverter.getDate('DD/MM/YYYY') ).toEqual('25/10/1995');
		expect( dateConverter.getDate('YYYYMMDD') ).toEqual('19951025');
		expect( dateConverter.getDate('MMDDYYYY') ).toEqual('10251995');
		expect( dateConverter.getDate('DDMMYYYY') ).toEqual('25101995');
	});

	it('sets an empty date', function(){
		dateConverter.setDate('', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( false );
		expect( dateConverter.toDate() ).toBeFalsy( );
		expect( dateConverter.getDate( 'DD-MM-YYYY' ) ).toBeFalsy( );
	});

	it('sets a null date', function(){
		dateConverter.setDate(null, 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( false );
		expect( dateConverter.toDate() ).toBeFalsy( );
		expect( dateConverter.getDate( 'DD-MM-YYYY' ) ).toBeFalsy( );
	});

	it('sets a non existing date', function(){
		dateConverter.setDate('32-45-1895', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( false );
		expect( dateConverter.toDate() ).toBeFalsy( );
		expect( dateConverter.getDate( 'DD-MM-YYYY' ) ).toBeFalsy( );
	});

	it('sets Feb 29 in a non leap year', function(){
		dateConverter.setDate('29-02-2013', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( false );
		expect( dateConverter.toDate() ).toBeFalsy( );
		expect( dateConverter.getDate( 'DD-MM-YYYY' ) ).toBeFalsy( );
	});

	it('sets Feb 29 in a leap year', function(){
		dateConverter.setDate('29-02-2012', 'DD-MM-YYYY');
		expect( dateConverter.isValid() ).toBe( true );
		expect( dateConverter.toDate() ).toBeTruthy( );
		expect( dateConverter.getDate( 'DD-MM-YYYY' ) ).toBeTruthy( );
	});

	it('works with chained calls', function(){
		expect( dateConverter.setDate('29-02-2012', 'DD-MM-YYYY').isValid() ).toBe( true );
		expect( dateConverter.setDate('30-02-2012', 'DD-MM-YYYY').isValid() ).toBe( false );
		expect( dateConverter.setDate( '1995-10-25', 'yyyy-mm-dd' ).getDate('DD/MM/YYYY') ).toEqual('25/10/1995');
	});

});


