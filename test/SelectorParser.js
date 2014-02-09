/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    SelectorParser = require('../lib/SelectorParser.js');

describe('The Selector Parser', function() {
    beforeEach(function() {
        selectorParser = new SelectorParser();
    });

    it('returns information on the type of node parsed', function() {
        expect(selectorParser.parse('#my-form').type).to.equal('selector');
    });

    it('returns collections of identifiers for a selector', function() {
        expect(selectorParser.parse('#my-form')).to.have.property('identifiers');
    });

    it('returns a collection of (n) items for a selector of (n) identifiers', function() {
        expect(selectorParser.parse('#my-form').identifiers).to.have.length(1);
        expect(selectorParser.parse('#my-form #username.error').identifiers).to.have.length(3);
        expect(selectorParser.parse('#my-form input[name=username]').identifiers).to.have.length(3);
    });

    it('correctly parses universal identifiers in a selector', function() {
        expect(selectorParser.parse('body .list *:first-child').identifiers).to.have.length(4);
    });

    it('correctly parses type identifiers in a selector', function() {
        expect(selectorParser.parse('body form input').identifiers).to.have.length(3);
    });

    it('correctly parses class identifiers in a selector', function() {
        expect(selectorParser.parse('.login-form .checkbox.error').identifiers).to.have.length(3);
    });

    it('correctly parses id identifiers in a selector', function() {
        expect(selectorParser.parse('#login-page #form#login-form input#password.error').identifiers).to.have.length(6);
    });

    it('correctly parses attribute identifiers in a selector', function() {
        expect(selectorParser.parse('form[name=login-form]').identifiers).to.have.length(2);
        expect(selectorParser.parse('a[rel][]').identifiers).to.have.length(2);
        expect(selectorParser.parse('a[rel~="copyright"]').identifiers).to.have.length(2);
        expect(selectorParser.parse('a[hreflang|="en"]').identifiers).to.have.length(2);
        expect(selectorParser.parse('a[hreflang=fr]').identifiers).to.have.length(2);
    });

    it('correctly parses pseudo-class identifiers in a selector', function() {
        expect(selectorParser.parse('a:first-child').identifiers).to.have.length(2);
    });

    it('correctly parses pseudo-element identifiers in a selector', function() {
        expect(selectorParser.parse('p::first-line').identifiers).to.have.length(2);
    });
});