/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    StylesheetParser = require('../lib/StylesheetParser.js');

describe('The Stylesheet Parser', function() {

    beforeEach(function() {
        stylesheetParser = new StylesheetParser;
    });

    it('should return an empty object when called without a parameter', function() {
        expect(stylesheetParser.parse()).to.be.an('object');
        expect(stylesheetParser.parse()).to.be.empty;
    });

    it('should return a non-empty object when called with a CSS string parameter', function () {
        expect(stylesheetParser.parse("body {border: 0} h1 {font-weight: bold;}")).to.be.an('object');
        expect(stylesheetParser.parse("body {border: 0} h1 {font-weight: bold;}")).not.to.be.empty;
    });

    it('should return information on the type of node parsed', function() {
        expect(stylesheetParser.parse("body {border: 0} h1 {font-weight: bold;}").type).to.equal('stylesheet');
    });

    it('should return (n) items of child rules for a stylesheet of (n) declarations', function() {
        expect(stylesheetParser.parse("body {border: 0} h1 {font-weight: bold;}")).to.have.property('children');
        expect(stylesheetParser.parse("body {border: 0} h1 {font-weight: bold; }").children).to.have.length(2);

        var multipleRules = "body {border: 0;} h1 {font-weight: bold;}"
            + " p {color: #333333; font-size: 1.2em; width: 100%} input {border: 1px solid #333333;"
            + " background-color: 1px solid #CCCCCC; padding: 0.1em; linear-gradient(45deg, #00f, #f00)}";
        expect(stylesheetParser.parse(multipleRules)).to.have.property('children');
        expect(stylesheetParser.parse(multipleRules).children).to.have.length(4);

        var multipleSelectors = "body section :first-child {background: #FFF;}"
            + "form#registration-form > input.username {font-weight: bold;}";
        expect(stylesheetParser.parse(multipleSelectors)).to.have.property('children');
        expect(stylesheetParser.parse(multipleSelectors).children).to.have.length(2);
    });
});