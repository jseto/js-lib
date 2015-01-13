'use strict';

describe('sprintf', function() {

	var sprintfFilter;

	beforeEach(module('jsLib.sprintf'));
	beforeEach(inject(function($filter) {
		sprintfFilter = $filter('sprintf');
	}));

	it('should return original value if not a string', function() {
		expect(sprintfFilter(undefined, 'bob')).toEqual(undefined);
		expect(sprintfFilter(null, 'bob')).toEqual(null);
		expect(sprintfFilter('', 'bob')).toEqual('');
		expect(sprintfFilter(1, 'bob')).toEqual(1);
	});

	it('should return original string if no tokens present', function() {
		expect(sprintfFilter('abc', 'bob')).toEqual('abc');
	});

	it('should replace {0} with "bar"', function() {
		expect(sprintfFilter('foo {0} bart', 'bar')).toEqual('foo bar bart');
	});

	it('should replace all instances of {0} if string token is passed', function() {
		expect(sprintfFilter('First {0}, then {0}, finally {0}', 'bob')).toEqual('First bob, then bob, finally bob');
	});

	it('should replace all instances of $n based on order of token array', function() {
		expect(sprintfFilter('First is {0}, then {1}, finally {2}', ['bob','frank','dianne'])).toEqual('First is bob, then frank, finally dianne');
	});

	it('should replace all instances of {n} even when replace with other tokens', function() {
		expect(sprintfFilter('First is {0}, then {1}, finally {2}', ['{1}','{2}','{0}'])).toEqual('First is {1}, then {2}, finally {0}');
	});

	it('should replace all instances :tokens based on keys of token object', function() {
		expect(sprintfFilter('First is :first, next is :second, finally there is :third', {first:'bob',second:'frank',third:'dianne'})).toEqual('First is bob, next is frank, finally there is dianne');
	});

	it('should do nothing if tokens are undefined', function() {
		expect(sprintfFilter('Hello There')).toEqual('Hello There');
	});
});