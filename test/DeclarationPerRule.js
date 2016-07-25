
/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
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

    it('should return 1 for the selector "body { color: #222 }"', function() {
        expect(metric.measure('body { color: 1 }')).to.equal(1);
    });

    it('should return 2 for the selector "body { color: #222; backgrund: #333; }"', function() {
        expect(metric.measure('body { color: #222; backgrund: #333; }')).to.equal(2);
    });

    it('should return 3 for the selector "body { color: #222; backgrund: #333; margin: 0; }"', function() {
        expect(metric.measure('body { color: #222; backgrund: #333; margin: 0; }')).to.equal(3);
    });

    it('should return 4 for the selector "body { color: #222; backgrund: #333; margin: 0; padding: 0; }"', function() {
        expect(metric.measure('body { color: #222; backgrund: #333; margin: 0; padding: 0; }')).to.equal(4);
    });
});
