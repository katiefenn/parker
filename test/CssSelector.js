/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssSelector = require('../lib/CssSelector.js');

describe('The Selector Parser', function() {
    it('returns a collection of (n) items for a selector of (n) identifiers', function() {
        var cssSelector = new CssSelector('#my-form');
        expect(cssSelector.getIdentifiers()).to.have.length(1);
        cssSelector = new CssSelector('#my-form #username.error');
        expect(cssSelector.getIdentifiers()).to.have.length(3);
        cssSelector = new CssSelector('#my-form input[name=username]');
        expect(cssSelector.getIdentifiers()).to.have.length(3);
    });

    it('correctly parses universal identifiers in a selector', function() {
        var cssSelector = new CssSelector('body .list *:first-child');
        expect(cssSelector.getIdentifiers()).to.have.length(4);
    });

    it('correctly parses type identifiers in a selector', function() {
        var cssSelector = new CssSelector('body form input');
        expect(cssSelector.getIdentifiers()).to.have.length(3);
    });

    it('correctly parses class identifiers in a selector', function() {
        var cssSelector = new CssSelector('.login-form .checkbox.error');
        expect(cssSelector.getIdentifiers()).to.have.length(3);
    });

    it('correctly parses id identifiers in a selector', function() {
        var cssSelector = new CssSelector('#login-page #form#login-form input#password.error');
        expect(cssSelector.getIdentifiers()).to.have.length(6);
    });

    it('correctly parses attribute identifiers in a selector', function() {
        var cssSelector = new CssSelector('form[name=login-form]');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
        cssSelector = new CssSelector('a[rel][]');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
        cssSelector = new CssSelector('a[rel~="copyright"]');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
        cssSelector = new CssSelector('a[hreflang|="en"]');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
        cssSelector = new CssSelector('a[hreflang=fr]');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
    });

    it('correctly parses pseudo-class identifiers in a selector', function() {
        var cssSelector = new CssSelector('a:first-child');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
    });

    it('correctly parses pseudo-element identifiers in a selector', function() {
        var cssSelector = new CssSelector('p::first-line');
        expect(cssSelector.getIdentifiers()).to.have.length(2);
    });
});