var expect = require('chai').expect,
    metric = require('../metrics/TopSelectorSpecificity.js');

describe('The top-selector-specificity metric', function () {
    it('should return a specificity of "1" for the selector "table"', function () {
        expect(metric.measure("table")).to.equal(1);
    });

    it('should return a specificity of "1" for the selector "::first-line"', function () {
        expect(metric.measure('::before')).to.equal(1);
    });

    it('should return a specificity of "10" for the selector ".class"', function () {
        expect(metric.measure('.class')).to.equal(10);
    });

    it('should return a specificity of "10" for the selector "[href="/"]"', function () {
        expect(metric.measure('[href="/"]')).to.equal(10);
    });

    it('should return a specificity of "10" for the selector ":first"', function () {
        expect(metric.measure(':first')).to.equal(10);
    });

    it('should return a specificity of "100" for the selector "#main"', function () {
        expect(metric.measure('#main')).to.equal(100);
    });

    it('should return a specificity of "0" for the selector "*"', function () {
        expect(metric.measure('*')).to.equal(0);
    });

    it('should count only the specificity of the child selector of a :not identifier', function () {
        expect(metric.measure(':not(body)')).to.equal(1);
        expect(metric.measure(':not(.sidebar)')).to.equal(10);
        expect(metric.measure(':not(h1#main)')).to.equal(101);
    });

    it('should ignore identifier tokens inside attribute selectors', function () {
        expect(metric.measure('[href="#main"]')).to.equal(10);
    });
});
