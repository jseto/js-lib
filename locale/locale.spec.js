describe('Locale', function(){
	var provider;

	beforeEach(function () {
		// Initialize the service provider by injecting it to a fake module's config block
		angular.module('testApp', function () {})
			.config(function (LocaleProvider) {
				provider = LocaleProvider;
				provider.setLocale('ca');
				provider.setLocalePath('base/locale/');
		});
		// Initialize myApp injector
		module('pt','testApp');

		// Kickstart the injectors previously registered with calls to angular.mock.module
		inject(function (Locale) {});
	});

	it('works with provider internal functions', function () {
		expect( provider.getKey('header.home') ).toEqual('Inici');
	});

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


