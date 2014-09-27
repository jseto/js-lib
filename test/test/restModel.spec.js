describe('RestModel', function(){
	var RestModel, $httpBackend, user, userJSON, user_u;
	
	beforeEach(function(){
		module('js.restModel');
		inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');
			RestModel = $injector.get('RestModel');
		});

		user = {
			id: 6, user: "t", email: "t@t.com", password: "t", name: "Telesforo"
		};

		user_u = {
			id: 8, user: "u", email: "u@u.com", password: "u", name: "Urraca"
		};
		
		userJSON = {
			"id":6,"user":"t","email":"t@t.com","password":"t","name":"Telesforo"
		};
		
		$httpBackend.whenGET('/api/member?user=t').respond( user );
		$httpBackend.whenGET('/api/member?user=u').respond( user_u );
		$httpBackend.whenGET('/api/member?user=y').respond( 401, false );
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('gets a proper model', function(){
		var sampleUser = RestModel('/api/member');
		var model = sampleUser.get( { user: 't' } );
		expect( model.name ).toBeUndefined();
		$httpBackend.flush();
		expect( model.name ).toEqual('Telesforo');
	});

	it('calls success callback', function(){
		var sampleUser = RestModel('/api/member');
		var callbackData = null;

		var model = sampleUser.get( { user: 't' } )
		model.getPromise().then( function success( reply ){
			callbackData = reply.data;
		});

		$httpBackend.flush();
		expect( callbackData ).toEqual( user );
	});

	// it('creates method update', function(){
	// 	var sampleUser = RestModel('/api/member', {
	// 		update: {
	// 			method: 'post'
	// 		}
	// 	});
	// 	var model = sampleUser.get( { user: 't' } );
	// 	expect( model.update ).toBeDefined();
	// 	$httpBackend.flush();
	// });

	it('creates a new model to be created in the resource', function(){
		$httpBackend.expectPOST('/api/member/create', userJSON ).respond( 201, userJSON );
		var sampleUser = RestModel('/api/member');
		var model = sampleUser.create( userJSON );
		$httpBackend.flush();
		expect( model.id ).toEqual( userJSON.id );
	});

	// it('overrides verb in create method', function(){
	// 	$httpBackend.expectPOST('/api/member/my_create', userJSON ).respond( 201, userJSON );
	// 	var sampleUser = RestModel('/api/member');
	// 	var model = sampleUser.create( userJSON, {verb: 'my_create'} );
	// 	$httpBackend.flush();
	// 	expect( model.id ).toEqual( userJSON.id );
	// });

	it('updates unchanged model', function(){
		var sampleUser = RestModel('/api/member');
		var model = sampleUser.get( { user: 't' } );
		expect( model.name ).toBeUndefined();
		$httpBackend.flush();
		$httpBackend.expectPOST('/api/member', userJSON ).respond( 201, true );
		expect( model.name ).toEqual('Telesforo');
		console.log(model)
		model.update();
		$httpBackend.flush();
	});

	it('updates changed model', function(){
		var updatedUserJSON=userJSON;
		updatedUserJSON["email"]="h@h.h";
		var sampleUser = RestModel('/api/member');
		var model = sampleUser.get( { user: 't' } );
		$httpBackend.flush();
		$httpBackend.expectPOST('/api/member', updatedUserJSON ).respond( 201, true );
		model.email='h@h.h';
		model.update();
		$httpBackend.flush();
	});

	it('creates a new method verbs', function(){
		var sampleUser = RestModel('/api/member',{
			my_verb1: {
				method: 'post',
				verb: 'verb1'
			},
			get_club: {
				method: 'get',
				verb: 'club'
			}
		});
		var model = sampleUser.get( { user: 't' } );
		$httpBackend.flush();
		$httpBackend.expectPOST('/api/member/verb1', userJSON ).respond( 201, true );
		model.my_verb1();
		$httpBackend.expectGET('/api/member/club?user=t' ).respond( 201, { name: 'club maco' } );
		var club = model.get_club( { user: 't' } );
		$httpBackend.flush();
		expect( club.name ).toBe('club maco');
	});

	it('broadcast restModelReqStart and restModelReqStop', function(){
		var scope;
		inject(function($injector){
			scope = $injector.get('$rootScope');
		});

		spyOn( scope, '$broadcast' );

		var sampleUser = RestModel('/api/member');

		expect( scope.$broadcast ).not.toHaveBeenCalledWith('restModelReqStart');
		expect( scope.$broadcast ).not.toHaveBeenCalledWith('restModelReqStop');

		var model = sampleUser.get( { user: 't' });
		expect( scope.$broadcast ).toHaveBeenCalledWith('restModelReqStart');
		expect( scope.$broadcast ).not.toHaveBeenCalledWith('restModelReqStop');

		$httpBackend.flush();

		expect( scope.$broadcast.calls.length ).toBe( 2 );
		expect( scope.$broadcast ).toHaveBeenCalledWith('restModelReqStop');
	});

	it('intantiates different models', function(){
		var model1 = RestModel('/api/member');
		var model2 = RestModel('/api/member');

		var user1 = model1.get({user:'t'});
		var user2 = model2.get({user:'u'});
		$httpBackend.flush();
		expect( user1.name ).not.toBe( user2.name );
	});

	it( 'executes preprocessing options passed function as promise', function(){
		// shows how to implement tables as model deep objects

		$httpBackend.expectPOST('/api/submodel/create'/*+'?field=submodel_field'*/)
			.respond( 201, {
				id: 1,
				field: 'submodel_field'
		});

		$httpBackend.expectPOST('/api/model/create'+'?field=model_field&submodel=1')
			.respond( 201, { 
				id: 0,
				field: 'model_field',
				submodel: 1
		});

		var model = {		// model in memory has all fields as objects not as references
			field: 'model_field',
			submodel: {
				field: 'submodel_field'
			} 
		}

		var Submodel = RestModel('/api/submodel');
		var Model = RestModel('/api/model',{},{
			replaceReferences: {
				submodel: {
					create: function( smodel ){
						var sm = Submodel.create( smodel );
						return sm.id;
					}
				}
			},
		});

		var createdModel = Model.create( model );
		console.log( createdModel )
//		var createdSubmodel = Submodel.create();

		$httpBackend.flush();
		expect( createdModel.id ).toBe( 0 );
		expect( createdModel.submodel ).toBe( 1 );
	})
});


