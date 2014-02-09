/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    metric = require('../metrics/IdentifiersPerSelector.js');


describe('The identifiers-per-selector metric', function () {
    it('should provide a string identifier for the metric', function() {
        expect(metric.id).to.be.a('string');
    });

    it('should provide a metric type', function() {
        expect(metric.aggregate).to.match(/sum|mean/g);
    });

    it('should return 0 for an empty string', function () {
        expect(metric.measure('')).to.equal(0);
    });

    it('should return 1 for the selector "body"', function() {
        expect(metric.measure('body')).to.equal(1);
    });

    it('should return 2 for the selector "body section"', function() {
        expect(metric.measure('body section')).to.equal(2);
    });

    it('should return 3 for the selector "body section.articles"', function() {
        expect(metric.measure('body section.acticles')).to.equal(3);
    });

    it('should return 4 for the selector "body section.articles>article"', function() {
        expect(metric.measure('body section.articles>article')).to.equal(4);
    });

    it('should return 5 for the selector "body section.articles>article:first-child"', function() {
        expect(metric.measure('body section.articles>article:first-child')).to.equal(5);
    })

    it('should return 7 for the selector "body section.articles>article:first-child p::first-line', function() {
        expect(metric.measure('body section.articles>article:first-child p::first-line')).to.equal(7);
    });

    it('should return 3 for the selector "form[name=login] input"', function() {
        expect(metric.measure('form[name=login] input')).to.equal(3);
        expect(metric.measure('form[name="login"] input')).to.equal(3);
        expect(metric.measure("form[name='login'] input")).to.equal(3);
    });

    it('should return 2 for the selector "input[checked]"', function() {
        expect(metric.measure('input[checked]')).to.equal(2);
    });

    it('should return 2 for the selector "input[value~=Mrs]"', function() {
        expect(metric.measure('input[value~=Mrs]')).to.equal(2);
        expect(metric.measure('input[value~="Mrs"]')).to.equal(2);
        expect(metric.measure("input[value~='Mrs']")).to.equal(2);
    });
});
