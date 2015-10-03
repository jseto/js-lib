'use strict';

describe('Locale', function(){
	var provider;

	beforeEach(function () {
		module('jsLib.locale', function(LocaleProvider){
			//config stage
			provider = LocaleProvider;
			provider.setLocale('ca');
			provider.setLocalePath('base/demo/locale/');
		});
	});

	it('works with provider internal functions', inject( function (Locale) {
		expect( provider.getKey('header.home') ).toEqual('Inici');
	}));

	it('returns plain key', function () {
		inject(function (Locale) {
			expect( Locale.localize('header.home') ).toEqual('Inici');
		});
	});

	it('returns array key', function () {
		inject(function (Locale) {
			var array = Locale.localize('home.bannerText');
			expect( array ).toContain('Reserva de pistes');
			expect( array.length ).toBe(4);
		});
	});

	it('returns a filtered key', inject(function( locFilter ){
		expect( locFilter('header.home') ).toEqual('Inici');
	}));
});
