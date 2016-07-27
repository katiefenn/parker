/*! Parker v0.0.0 - MIT license */

'use strict';

var CssSelector = require('../lib/CssSelector');
var _ = require('lodash');

var CLASS_A = 1;
var CLASS_B = 256;
var CLASS_C = 65536;

module.exports = function (rawSelector) {
    var totalSpecificity = 0,
        selector = new CssSelector(rawSelector);

    _.each(selector.getIdentifiers(), function (identifier) {
        var idIdentifiers = countIdIdentifiers(identifier),
            classIdentifiers = countClassIdentifiers(identifier),
            attributeIdentifiers = countAttributeIdentifiers(identifier),
            pseudoClassIdentifiers = countPseudoClassIdentifiers(identifier),
            typeIdentifiers = countTypeIdentifiers(identifier),
            pseudoElementIdentifiers = countPseudoElementIdentifiers(identifier);

        totalSpecificity += Number(
            (idIdentifiers * CLASS_C) +
            ((classIdentifiers + attributeIdentifiers + pseudoClassIdentifiers) * CLASS_B) +
            ((typeIdentifiers + pseudoElementIdentifiers) * CLASS_A));
    });

    return totalSpecificity;
}

var countIdIdentifiers = function (identifier) {
    var regex = /#/,
        matches = regex.exec(identifier);

    if (matches && !countAttributeIdentifiers(identifier)) {
        return matches.length;
    }

    return 0;
};

var countClassIdentifiers = function (identifier) {
    var regex = /\./,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countAttributeIdentifiers = function (identifier) {
    var regex = /\[/,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countPseudoClassIdentifiers = function  (identifier) {
    var regex = /^:[^:]/,
        matches = regex.exec(identifier);

    // :not pseudo-class identifier itself is ignored
    // only selectors inside it are counted
    if (identifier.match(/:not/)) {
        return 0;
    }

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countTypeIdentifiers = function (identifier) {
    var regex = /^[a-zA-Z_]/;

    if (regex.exec(identifier)) {
        return 1;
    }

    return 0;
};

var countPseudoElementIdentifiers = function (identifier) {
    var regex = /::/,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var stripNotIdentifier = function (identifier) {
    if (identifier.match(/:not/)) {
        return identifier.replace(/:not\(|\)/g, '');
    }

    return identifier;
};
