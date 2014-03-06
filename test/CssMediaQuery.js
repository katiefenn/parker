/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssMediaQuery = require('../lib/CssMediaQuery.js');

describe('The Css Media Query object', function () {
    it('should return (n) queries for a media query of (n) queries', function () {
        var cssMediaQuery = new CssMediaQuery('@media print {a {color: #000;}}');
        expect(cssMediaQuery.getQueries()[0]).to.equal('print');

        cssMediaQuery = new CssMediaQuery('@media (min-width: 700px) and (orientation: landscape) {.blogroll {display: none;}}');
        expect(cssMediaQuery.getQueries()[0]).to.equal('(min-width: 700px) and (orientation: landscape)');

        cssMediaQuery = new CssMediaQuery('@media handheld, (min-width: 700px) {.blogroll {display: none;}}');
        expect(cssMediaQuery.getQueries()[0]).to.equal('handheld');
        expect(cssMediaQuery.getQueries()[1]).to.equal('(min-width: 700px)');

        cssMediaQuery = new CssMediaQuery('@media handheld or (min-width: 700px) {.blogroll {display: none;}}');
        expect(cssMediaQuery.getQueries()[0]).to.equal('handheld');
        expect(cssMediaQuery.getQueries()[1]).to.equal('(min-width: 700px)');
    });

    it('should return (n) queries for a media query of (n) rules', function () {
        var cssMediaQuery = new CssMediaQuery('@media print {a {color: #000;} header {display: none;}}');
        expect(cssMediaQuery.getRules()[0]).to.equal('a {color: #000;}');
        expect(cssMediaQuery.getRules()[1]).to.equal('header {display: none;}');
    });
});