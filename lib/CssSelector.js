/*! Parker v0.1.0 - MIT license */

'use strict';

var _ = require('lodash'),
    DELIMITERS = ['.', '#', '>', '[', ' ', ':', '*'];

function CssSelector(raw) {
    this.raw = raw;
    this.identifiers = [];
}

CssSelector.prototype.getIdentifiers = function () {
    var identifier = '',
        bracketDepth = 0,
        parenDepth = 0;

    _.each(this.raw, function (character, index) {
        var insideBrackets = bracketDepth || parenDepth,
            isSecondColon = character == ':' && this.raw[index - 1] == ':';

        if (!insideBrackets && isDelimiter(character) && !isSecondColon) {
            this.addIdentifier(identifier);
            identifier = '';
        }

        switch(character) {
            case '(': parenDepth++; break;
            case ')': parenDepth--; break;
            case '[': bracketDepth++; break;
            case ']': bracketDepth--; break;
        }

        if (!_.contains([' ', '>'], character)) {
            identifier += character;
        }
    }, this);

    this.addIdentifier(identifier);
    return _.without(this.identifiers, ' ', '', '[]');
}

CssSelector.prototype.addIdentifier = function (identifier) {
    this.identifiers.push(identifier);
};

function isDelimiter(character) {
    return _.contains(DELIMITERS, character)
}

module.exports = CssSelector;
