/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssRule = require('../lib/CssRule.js');

describe('The Rule Parser', function () {
    it('should return a collection of (n) items of selectors for a rule of (n) selectors', function () {
        var cssRule = new CssRule('body {border: 0;}');
        expect(cssRule.getSelectors()).to.have.length(1);

        var complexRule = 'body, html, .container .wrapper, #container, .container a[rel="blah"]'
            + '{background: url(img.png); background-color: #ffffff;}';
        cssRule = new CssRule(complexRule);

        expect(cssRule.getSelectors()).to.have.length(5);
    });

    it('should return a collection of (n) items of declarations for a rule of (n) declarations', function () {
        var cssRule = new CssRule('body {border: 0;}');
        expect(cssRule.getDeclarations()).to.have.length(1);

        var complexRule = 'body, html, .container .wrapper, #container, .container a[rel="blah"]'
            + '{background: url(img.png); background-color: linear-gradient(45deg, #00f, #f00)}';
        cssRule = new CssRule(complexRule);
        
        expect(cssRule.getDeclarations()).to.have.length(2);
    });
});