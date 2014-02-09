/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect,
    DeclarationParser = require('../lib/DeclarationParser.js');

describe('The Declaration Parser', function() {
    beforeEach(function() {
        declarationParser = new DeclarationParser;
    });

    it('should return a property and a value for a declaration', function() {
        expect(declarationParser.parse('color: #fff').property).to.equal('color');
        expect(declarationParser.parse('color: #fff').value).to.equal('#fff');
    });
});