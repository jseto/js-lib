describe('Select directive', function() {
	var element, scope, rootScope, ctrlScope;

	beforeEach(	module('jsWidgets.scrollList') );
	beforeEach( module('js.restModel') );
	
	// load the templates
	beforeEach( module( 'jsLib/jsWidgets/test/simpleScrollList.html') );

	beforeEach(inject(function($rootScope, $compile, $controller) {

		// ctrlScope = $rootScope.$new();
		// console.log('orig ctrlScope', ctrlScope.$id)

		// SelectCtrl = $controller('SelectCtrl', {
		// 	$scope: $rootScope,
		// 	$element: element,
		// 	$attrs: {}, //element.attr()
		// });

		element = angular.element(
			'<div 								'+
			'	jsw-scroll-list="samples"		'+
			'	render="render"					'+
			'	search="search"		 			'+
			'	fixed-height="true"	 			'+
			'	max-elements="maxElements"		'+
			'	more-data="selectMoreData"		'+
			'	less-data="selectLessData"		'+
			'	template="jsLib/jsWidgets/test/simpleScrollList.html"'+
			'	></div>							'
		);

		scope = $rootScope;
		scope.maxElements = 6;
		$compile(element)(scope);
		scope.$digest();
	}));

	afterEach(function(){
		expect( element.find('li').length ).toEqual( scope.maxElements );
	});
 
	it('should show empty items', function(){
		var el =  element.find('li');
		expect( el.length ).toEqual( scope.maxElements );
		expect( el[0].innerText.trim() ).toEqual('');
	});

	it('should show navigation items', function(){
		var el =  element.find('a');
		expect( el.length ).toEqual( 2 );	
	})


/********/

	describe('Array behaviour', function(){
		var samples;
		beforeEach(function(){
			samples = ['pep','marxc','john','margxc','joghn','marxgdc','jodhn','matyrxc','johtn'];
			scope.$apply( function(){
				scope.samples = samples;
			});
		})

		it('should load data', function() { 
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('pep');
		});

		it('should call render function', function() { 
			scope.render = function( item ){
				return item + ' feo';
			}
			scope.$apply();
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('pep feo');
		});

		it('should show more items', function(){
			el =  element.find('a');
			el[1].click();
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('jodhn');
			expect( el[scope.maxElements-1].innerText.trim() ).toEqual('');
		});
		
		it('should show less items', function(){
			el =  element.find('a');
			el[1].click();
			el[0].click();
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('pep');
			expect( el[scope.maxElements-1].innerText.trim() ).toEqual('marxgdc');
		});
	});


/********/

	describe('data source from restModel',function(){
		var RestModel, $httpBackend, data, dataModel;

		var flush = function(){
			$httpBackend.flush();
			el =  element.find('a');
		}

		beforeEach(function(){
			inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
				RestModel = $injector.get('RestModel');
				$controller = $injector.get('$controller');
			});

			data = [];
			for (var i = 1; i <= 100; i++) {
				data.push( String(i) );
			}
			
			$httpBackend.whenGET('/search').respond( data );

			$httpBackend.whenGET('/search?limit=' + scope.maxElements )
				.respond( data.slice(0,scope.maxElements) );

			$httpBackend.whenGET('/search?limit=' + scope.maxElements + '&offset=' + scope.maxElements )
				.respond( data.slice(scope.maxElements,scope.maxElements*2) );

			Items = RestModel('/search')
			scope.$apply( function(){
				scope.samples = Items.get();
			});
		});

		it('should load data', function() { 
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('');
			expect( el.length ).toEqual( scope.maxElements );
			flush();
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('1');
		});

		it('should call render function', function() { 
			scope.render = function( item ){
				return item + ' feo';
			}
			scope.$apply();
			flush();
			el =  element.find('li');
			expect( el[scope.maxElements-1].innerText.trim() ).toEqual('6 feo');
		});

		it('should ask for more items', function(){
			// flush beforeEach call
			flush();

			scope.selectMoreData = function(){
				return Items.get({
					limit: scope.maxElements,
					offset: scope.maxElements
				});
			}
			// query few items from db
			scope.samples = Items.get({
				limit: scope.maxElements
			});

			scope.$apply();
			flush(); //previous query

			el = element.find('a');
			el[1].click();
			flush(); //from select more data
			el =  element.find('li');
			expect( el[0].innerText.trim() ).toEqual('7');
		});

	});
});
