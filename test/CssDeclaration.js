/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    CssDeclaration = require('../lib/CssDeclaration.js');

describe('The Declaration Parser', function() {
    beforeEach(function() {
        cssDeclaration = new CssDeclaration('color: #fff');
    });

    it('should return a property and a value for a declaration', function() {
        expect(cssDeclaration.getProperty()).to.equal('color');
        expect(cssDeclaration.getValue()).to.equal('#fff');
    });
});