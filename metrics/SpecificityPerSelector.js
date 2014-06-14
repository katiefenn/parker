/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'specificity-per-selector',
    name: 'Specificity Per Selector',
    type: 'selector',
    aggregate: 'mean',
    format: 'number',
    measure: function (selector) {
        var totalSpecificity = 0;
        _.each(getIdentifiers(selector), function (identifier) {
            var idIdentifiers = countIdIdentifiers(identifier),
                classIdentifiers = countClassIdentifiers(identifier),
                attributeIdentifiers = countAttributeIdentifiers(identifier),
                pseudoClassIdentifiers = countPseudoClassIdentifiers(identifier),
                typeIdentifiers = countTypeIdentifiers(identifier),
                pseudoElementIdentifiers = countPseudoElementIdentifiers(identifier);

            totalSpecificity += Number(
                String(idIdentifiers) +
                String(classIdentifiers + attributeIdentifiers + pseudoClassIdentifiers) +
                String(typeIdentifiers + pseudoElementIdentifiers));
        });

        return totalSpecificity;
    }
};

var getIdentifiers = function (selector) {
    var identifiers = [],
        segments = selector.split(/\s+[\s\+>]\s?|~^=/g);

    _.each(segments, function (segment) {
        identifiers = identifiers.concat(segment.match(/[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w-]+/g));
    });

    return identifiers;
};

var countIdIdentifiers = function (identifier) {
    var regex = /#/,
        matches = regex.exec(identifier);

    if (matches) {
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

var countPseudoClassIdentifiers = function (identifier) {
    var regex = /:[^:]/,
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
