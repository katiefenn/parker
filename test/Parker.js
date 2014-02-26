/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    Parker = require('../lib/Parker.js');

describe('The Parker tool', function() {
    it('should throw an exception if stylesheet data not supplied as string, array or multi-param strings', function() {
        parker = new Parker([]);
        expect(function() {parker.run({})}).to.throw();
        expect(function() {parker.run(0)}).to.throw();
        expect(function() {parker.run(1, [], {})}).to.throw();
    });

    it('should not throw an exception if stylesheet data is supplied as string, array or multi-param strings', function() {
        parker = new Parker([]);
        expect(function() {parker.run('body {background: #FFF;}')});
        expect(function() {parker.run(array('body {background: #FFF;}'))});
        expect(function() {parker.run('body {background: #FFF;}', 'body {background: #FFF;}')});
    });

    it('should run metrics on stylesheets', function() {
        var mockMetric = {id: 'mock-stylesheet-metric', type: 'stylesheet', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);
        expect(parker.run('body {background: #FFF;}')).to.have.property('mock-stylesheet-metric');
    });

    it('should return sum values for sum metrics', function() {
        var mockMetric = {id: 'mock-stylesheet-metric', type: 'stylesheet', aggregate: 'sum', measure: function() {return 1}},
            stylesheet = 'body {background: #FFF;}';

        parker = new Parker([mockMetric]);
        var report = parker.run([stylesheet, stylesheet, stylesheet]);

        
        expect(report).to.have.property('mock-stylesheet-metric');
        expect(report['mock-stylesheet-metric']).to.equal(3);
    });

    it('should return mean values for mean metrics', function() {
        var mockMetric = {id: 'mock-stylesheet-metric', type: 'stylesheet', aggregate: 'mean', measure: function() {return 1}},
            stylesheet = 'body {background: #FFF;}';

        parker = new Parker([mockMetric]);
        var report = parker.run([stylesheet, stylesheet, stylesheet]);

        
        expect(report).to.have.property('mock-stylesheet-metric');
        expect(report['mock-stylesheet-metric']).to.equal(1);
    });

    it('should return max values for max metrics', function () {
        var mockIntMetric = {id: 'mock-int-metric', type: 'stylesheet', aggregate: 'max', measure: function(stylesheet) {return stylesheet.length;}},
            parker = new Parker([mockIntMetric]),
            report = parker.run(['body {background: #FFF;}', 'body {background: #FFFFFF;}']);
        
        expect(report).to.have.property('mock-int-metric');
        expect(report['mock-int-metric']).to.equal(27);
    });

    it('should return max values determined by an iterator function if one is present', function() {
        var mockStringMetric = {id: 'mock-string-metric', type: 'stylesheet', aggregate: 'max', measure: function(stylesheet) {return stylesheet;}, iterator: function(string) {return string.length}},
            parker = new Parker([mockStringMetric]),
            report = parker.run(['body {background: #FFF;}', 'body {background: #FFFFFF;}']);
        
        expect(report).to.have.property('mock-string-metric');
        expect(report['mock-string-metric']).to.equal('body {background: #FFFFFF;}');
    });

    it('should return list values for list metrics', function () {
        var mockSingleMetric = {id: 'mock-single-list-item-metric', type: 'stylesheet', aggregate: 'list', measure: function(stylesheet) {return stylesheet}},
            mockMultipleMetric = {id: 'mock-multiple-list-item-metric', type: 'stylesheet', aggregate: 'list', measure: function(stylesheet) {return ['a', 'b']}},
            parker = new Parker([mockSingleMetric, mockMultipleMetric]),
            report = parker.run(['body {background: #FFF;}', 'body {background: #FFF;}']);

        expect(report).to.have.property('mock-single-list-item-metric');
        expect(report['mock-single-list-item-metric']).to.be.an('array');
        expect(report['mock-single-list-item-metric']).to.have.length(2);
        expect(report['mock-single-list-item-metric'][0]).to.equal('body {background: #FFF;}');
        expect(report['mock-single-list-item-metric'][1]).to.equal('body {background: #FFF;}');
        expect(report['mock-multiple-list-item-metric']).to.be.an('array');
        expect(report['mock-multiple-list-item-metric']).to.have.length(4);
        expect(report['mock-multiple-list-item-metric'][0]).to.equal('a');
        expect(report['mock-multiple-list-item-metric'][1]).to.equal('b');
        expect(report['mock-multiple-list-item-metric'][0]).to.equal('a');
        expect(report['mock-multiple-list-item-metric'][1]).to.equal('b');
    });

    it('should return list values filtered by a filter function if one is present', function() {
        var mockMetric = {id: 'mock-list-metric', type: 'stylesheet', aggregate: 'list', measure: function(stylesheet) {return stylesheet}, filter: function(value, index, self) {return self.indexOf(value) === index;}},
            parker = new Parker([mockMetric]),
            report = parker.run(['body {background: #FFF;}', 'body {background: #FFF;}']);

        expect(report).to.have.property('mock-list-metric');
        expect(report['mock-list-metric']).to.be.an('array');
        expect(report['mock-list-metric']).to.have.length(1);
        expect(report['mock-list-metric'][0]).to.equal('body {background: #FFF;}');
    });

    it('should return length values for length metrics', function () {
        var mockMetric = {id: 'mock-length-metric', type: 'stylesheet', aggregate: 'length', measure: function(stylesheet) {return stylesheet}},
        parker = new Parker([mockMetric]);
        report = parker.run(['body {background: #FFF;}', 'body {background: #FFF;}', '']);

        expect(report).to.have.property('mock-length-metric');
        expect(report['mock-length-metric']).to.equal(2);
    });

    it('should run metrics on rules', function() {
        var mockMetric = {id: 'mock-rule-metric', type: 'rule', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]),
        report = parker.run('body {background: #FFF;} h1 {font-weight: bold;}');

        expect(report).to.have.property('mock-rule-metric');
        expect(report['mock-rule-metric']).to.equal(2);
    });

    it('should run metrics on at-rules', function() {
        var mockMetric = {id: 'mock-at-rule-metric', type: 'atrule', aggregate: 'sum', measure: function() {return 1;}};
        parker = new Parker([mockMetric]),
        report = parker.run('@media print { body { margin: 100px; }} @import url(css/styles.css); body { margin: 0; }');
        expect(report).to.have.property('mock-at-rule-metric');
        expect(report['mock-at-rule-metric']).to.equal(2);
    });

    it('should run metrics on selectors', function() {
        var mockMetric = {id: 'mock-selector-metric', type: 'selector', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);
        report = parker.run('body section {background: #FFF;} h1 {font-weight: bold;}');

        expect(report).to.have.property('mock-selector-metric');
        expect(report['mock-selector-metric']).to.equal(2);
    });

    it('should run metrics on identifiers', function() {
        var mockMetric = {id: 'mock-identifier-metric', type: 'identifier', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);

        report = parker.run("body section :first-child {background: #FFF;} form#registration-form > input.username {font-weight: bold;}");
        expect(report).to.have.property('mock-identifier-metric');
        expect(report['mock-identifier-metric']).to.equal(7);
    });

    it('should run metrics on declarations', function() {
        var mockMetric = {id: 'mock-declaration-metric', type: 'declaration', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);

        report = parker.run("body {margin: 0; padding: 0} a {color: #00f} h1 {font-weight: bold; color: #000;}");
        expect(report).to.have.property('mock-declaration-metric');
        expect(report['mock-declaration-metric']).to.equal(5);
    });

    it('should run metrics on properties', function() {
        var mockMetric = {id: 'mock-property-metric', type: 'property', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);

        report = parker.run("body {margin: 0; padding: 0} a {color: #00f} h1 {font-weight: bold; color: #000;}");
        expect(report).to.have.property('mock-property-metric');
        expect(report['mock-property-metric']).to.equal(5);
    });

    it('should run metrics on values', function() {
        var mockMetric = {id: 'mock-value-metric', type: 'value', aggregate: 'sum', measure: function() {return 1}};
        parker = new Parker([mockMetric]);

        report = parker.run("body {margin: 0; padding: 0} a {color: #00f} h1 {font-weight: bold; color: #000;}");
        expect(report).to.have.property('mock-value-metric');
        expect(report['mock-value-metric']).to.equal(5);
    });
});