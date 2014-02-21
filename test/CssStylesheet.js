/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssStylesheet = require('../lib/CssStylesheet.js');

describe('The Stylesheet Parser', function() {

    it('should return (n) items of child rules for a stylesheet of (n) declarations', function() {
        var cssStylesheet = new CssStylesheet("body {border: 0} h1 {font-weight: bold;}");
        expect(cssStylesheet.getRules()).to.have.length(2);

        var multipleRules = "body {border: 0;} h1 {font-weight: bold;}"
            + " p {color: #333333; font-size: 1.2em; width: 100%} input {border: 1px solid #333333;"
            + " background-color: 1px solid #CCCCCC; padding: 0.1em; linear-gradient(45deg, #00f, #f00)}";
        cssStylesheet = new CssStylesheet(multipleRules);
        expect(cssStylesheet.getRules()).to.have.length(4);

        var multipleSelectors = "body section :first-child {background: #FFF;}"
            + "form#registration-form > input.username {font-weight: bold;}";
        cssStylesheet = new CssStylesheet(multipleSelectors);
        expect(cssStylesheet.getRules()).to.have.length(2);
    });

    it('should ignore comments', function() {
        var cssStylesheet = new CssStylesheet("body {border: 0;} /* ./* */ a {color: #fff; /* comment */} * {margin: 0;}");
        expect(cssStylesheet.getRules()).to.have.length(3);
    });
});