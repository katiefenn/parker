/*! Parker v0.0.0 - MIT license */

'use strict';

function DeclarationParser() {

}

DeclarationParser.prototype.parse = function (declaration) {
    return {
        property: getProperty(declaration),
        value: getValue(declaration)
    };
};

var getProperty = function (declaration) {
    return declaration.split(':')[0].trim();
};

var getValue = function (declaration) {
    return declaration.split(':')[1].trim();
};

module.exports = DeclarationParser;