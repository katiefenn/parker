/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
	metric = require('../metrics/TotalIdSelectors.js');

describe('The total-id-selectors metric', function () {
	it('should provide a string identifier for the metric', function() {
		expect(metric.id).to.be.a('string');
	});

	it('should provide a metric type', function() {
		expect(metric.aggregate).to.match(/sum|mean/g);
	});

	it('should return 0 for an empty string', function () {
		expect(metric.measure('')).to.equal(0);
	});

	it('should return 1 for the selector "#test"', function() {
		expect(metric.measure('#test')).to.equal(1);
	});

	it('should return 1 for the selector "foo#test"', function() {
		expect(metric.measure('foo#test')).to.equal(1);
	});

	it('should return 1 for the selector "foo #test"', function() {
		expect(metric.measure('foo #test')).to.equal(1);
	});

	it('should return 0 for the selector "[href="#foo"]"', function () {
		expect(metric.measure('[href="#foo"]')).to.equal(0);
	});

	it('should return 1 for the selector "[href="#foo"] #foo"', function () {
		expect(metric.measure('[href="#foo"] #foo')).to.equal(1);
	});

	it('should return 2 for the selector "#foo #bar"', function () {
		expect(metric.measure('#foo #bar')).to.equal(2);
	});
});
