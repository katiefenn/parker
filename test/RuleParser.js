/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    RuleParser = require('../lib/RuleParser.js');

describe('The Rule Parser', function () {
    beforeEach(function () {
        ruleParser = new RuleParser();
    });

    it('should return information on the type of node parsed', function () {
        expect(ruleParser.parse('body {border: 0;}').type).to.equal('rule');
    });

    it('should return collections of selectors and declarations for a rule', function () {
        expect(ruleParser.parse('body {border: 0;}')).to.have.property('selectors');
        expect(ruleParser.parse('body {border: 0;}')).to.have.property('declarations');
    });

    it('should return a collection of (n) items of selectors for a rule of (n) selectors', function () {
        expect(ruleParser.parse('body {border: 0;}').selectors).to.have.length(1);

        var complexDeclaration = 'body, html, .container .wrapper, #container, .container a[rel="blah"]'
            + '{background: url(img.png); background-color: #ffffff;}';

        expect(ruleParser.parse(complexDeclaration).selectors).to.have.length(5);
    });

    it('should return a collection of (n) items of declarations for a rule of (n) declarations', function () {
        expect(ruleParser.parse('body {border: 0;}').declarations).to.have.length(1);

        var complexDeclaration = 'body, html, .container .wrapper, #container, .container a[rel="blah"]'
            + '{background: url(img.png); background-color: linear-gradient(45deg, #00f, #f00)}';
        
        expect(ruleParser.parse(complexDeclaration).declarations).to.have.length(2);
    });
});