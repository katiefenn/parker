/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssStylesheet = require('../lib/CssStylesheet.js');

describe('The Stylesheet Parser', function() {
    it('should return an empty array of child rules for an empty string', function () {
        var cssStylesheet = new CssStylesheet('');
        expect(cssStylesheet.getRules()).to.be.an('array');
        expect(cssStylesheet.getRules()).to.be.empty;
    });

    it('should return (n) items of child rules for a stylesheet of (n) rules', function() {
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

    it('should distinguish between media-queries and at-rules', function () {
        var cssStylesheet = new CssStylesheet("@media screen { body {border: 0;} } @include (styles.css); body { margin: 0; }");
        expect(cssStylesheet.getMediaQueries()[0]).to.equal('@media screen { body {border: 0;} }');
        expect(cssStylesheet.getMediaQueries()).to.have.length(1);
        expect(cssStylesheet.getRules()[0]).to.equal('body { margin: 0; }');
    });

    it('should return (n) items of child media-queries for a stylesheet of (n) media-queries', function () {
        var cssStylesheet = new CssStylesheet("@media screen { body {border: 0;} } @media print { a {color: #000;} } @include (styles.css);");
        expect(cssStylesheet.getMediaQueries()).to.have.length(2);
        expect(cssStylesheet.getMediaQueries()[0]).to.equal('@media screen { body {border: 0;} }');
        expect(cssStylesheet.getMediaQueries()[1]).to.equal('@media print { a {color: #000;} }');
    });

    it('should ignore comments', function () {
        var cssStylesheet = new CssStylesheet("body {border: 0;} /* ./* */ a {color: #fff; /* comment */} * {margin: 0;}");
        expect(cssStylesheet.getRules()).to.have.length(3);
    });

    it('should ignore newline characters', function () {
        var cssStylesheet = new CssStylesheet("body {\nborder: 0;\n}\na{\ncolor: #fff;\n}");
        expect(cssStylesheet.getRules()[0]).to.equal("body {border: 0;}");
        expect(cssStylesheet.getRules()[1]).to.equal("a{color: #fff;}");
        var cssStylesheet = new CssStylesheet("body {\r\nborder: 0;\r\n}\r\na{\r\ncolor: #fff;\r\n}");
        expect(cssStylesheet.getRules()[0]).to.equal("body {border: 0;}");
        expect(cssStylesheet.getRules()[1]).to.equal("a{color: #fff;}");
    });

    it('should return an array of malformed statements for a string containing malformed statements', function () {
        var cssStylesheet = new CssStylesheet('body {border: 0;} h1; h2 {font-weight: bold;}');
        expect(cssStylesheet.getRules()).to.be.an('array');
        expect(cssStylesheet.getMalformedStatements()[0]).to.equal('h1;');
    });

    it('should identify a rule with an unexpected colon as a malformed statement', function () {
        var cssStylesheet = new CssStylesheet('body {border: 0;} h1;{font-weight: bold;}');
        expect(cssStylesheet.getRules()).to.be.an('array');
        expect(cssStylesheet.getMalformedStatements()[0]).to.equal('h1;');
        expect(cssStylesheet.getMalformedStatements()[1]).to.equal('{font-weight: bold;}');
    });
});