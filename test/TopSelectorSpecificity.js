var expect = require('chai').expect,
    metric = require('../metrics/TopSelectorSpecificity.js');

describe('The top-selector-specificity metric', function () {
	it('should count only the specificity of the child selector of a :not identifier', function () {
		expect(metric.measure(':not(body)')).to.equal(1);
		expect(metric.measure(':not(.sidebar)')).to.equal(10);
		expect(metric.measure(':not(h1#main)')).to.equal(101);
	});
});