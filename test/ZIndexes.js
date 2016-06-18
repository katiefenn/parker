var expect = require('chai').expect,
    metric = require('../metrics/ZIndexes.js');

describe("The Z-Indexes metric", function() {
    it('should return 1 for "z-index: 1"', function () {
        expect(metric.measure('z-index: 1')).to.equal('1');
    });
});
