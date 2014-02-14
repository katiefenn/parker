/*! Parker v0.0.0 - MIT license */

'use strict';

function CssDeclaration(raw) {

    this.raw = raw;
}

CssDeclaration.prototype.getProperty = function () {
    if (this.raw.indexOf(':') === -1) {
        return '';
    }

    return this.raw.split(':')[0].trim();
};

CssDeclaration.prototype.getValue = function () {
    if (this.raw.indexOf(':') === -1) {
        return '';
    }

    return this.raw.split(':')[1].trim();
};

module.exports = CssDeclaration;