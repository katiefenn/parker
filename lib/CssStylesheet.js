/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssStylesheet(raw) {
    this.raw = raw;
}

CssStylesheet.prototype.getRules = function () {
    if (this.raw.length) {
        var pattern = /[\w\s>\.:\-_#\*\(\),\[\]\"\=]*\{[\w\s\:\n;\-#\.\(\)%,\/!\*]*}/g;
        return stripFormatting(stripComments(this.raw)).match(pattern);
    }

    else return {};
};

var stripComments = function (string) {
    return string.replace(/\/\*[^\/\*]*\*\//g, '');
};

var stripFormatting = function (string) {
    return stripNewlines(trimWhitespace(string));
};

var trimWhitespace = function (string) {
    return string.replace(/[ ]+/g, ' ');
};

var stripNewlines = function (string) {
    return string.replace(/\n/g, '');
};

module.exports = CssStylesheet;