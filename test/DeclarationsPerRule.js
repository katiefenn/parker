var expect = require('chai').expect,
    metric = require('../metrics/DeclarationsPerRule.js');

describe('The Declarations Per Rule metric', function() {


  context('when measuring a two-declaration rule', function() {
    var rule;

    beforeEach(function() {
        rule = ".heading { font-weight: bold; text-decoration: underline; }";
    });

    it('should return "2"', function() {
      expect(metric.measure(rule)).to.equal(2);
    });
  });
});
