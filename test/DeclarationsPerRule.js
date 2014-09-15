/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    Parker = require('../lib/Parker.js'),
    metric = require('../metrics/DeclarationsPerRule.js');


describe('The declarations-per-rule metric', function () {
    it('should provide a string identifier for the metric', function() {
        expect(metric.id).to.be.a('string');
    });

    it('should provide a metric type', function() {
        expect(metric.aggregate).to.match(/sum|mean/g);
    });

    it('should return 0 for an empty string', function () {
        expect(metric.measure('')).to.equal(0);
    });

    it('should return 1 for the selector "body {color:blue;}"', function() {
        expect(metric.measure('body {color:blue;}')).to.equal(1);
    });

    it('should return 2 for the selector "body section {color:blue;background:yellow;}"', function() {
        expect(metric.measure('body section {color:blue;background:yellow;}')).to.equal(2);
    });

    it('should return 2 for the selector "body section {color:blue;background:yellow;} body article h3 {text-align:center;color:red;}"', function() {
        var parker = new Parker([metric]),
            report = parker.run('body section {color:blue;background:yellow;} body article h3 {text-align:center;color:red;}');

        expect(report).to.have.property('declarations-per-rule');
        expect(report['declarations-per-rule']).to.equal(2);
    });

    it('should return 1.5 for the selector "body section {color:blue;background:yellow;} body article h3 {text-align:center;}"', function() {
        var parker = new Parker([metric]),
            report = parker.run('body section {color:blue;background:yellow;} body article h3 {text-align:center;}');

        expect(report).to.have.property('declarations-per-rule');
        expect(report['declarations-per-rule']).to.equal(1.5);
    });

    it('should return 2 for the selector "body section {-webkit-something:blue;-moz-anything:yellow;} body article h3 {text-align:center;color:red;}"', function() {
        var parker = new Parker([metric]),
            report = parker.run('body section {-webkit-something:blue;-moz-anything:yellow;} body article h3 {text-align:center;color:red;}');

        expect(report).to.have.property('declarations-per-rule');
        expect(report['declarations-per-rule']).to.equal(2);
    });
});
