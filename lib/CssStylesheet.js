/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssStylesheet(raw) {
    this.raw = raw;
}

CssStylesheet.prototype.getRules = function () {
    this.children = this.children || getChildren(this.raw);

    return this.children.filter(function (child) {
        return !child.match(/^@/g);
    });
};

CssStylesheet.prototype.getMediaQueries = function () {
    this.children = this.children || getChildren(this.raw);
    return this.children.filter(function (child) {
        return child.match(/^@media/g);
    });
};

var getChildren = function (raw) {
    var children = [],
        depth = 0,
        child = '',
        stylesheet = stripComments(stripFormatting(raw));

    for (var index = 0; index < stylesheet.length; index++) {
        child += stylesheet.charAt(index);
        if (stylesheet.charAt(index) === '{') {
            depth ++;
        }
        else if (stylesheet.charAt(index) == '}') {
            depth --;
        }

        if (depth === 0 && stylesheet.charAt(index).match(/\}|;/g)) {
            children.push(child.trim());
            child = '';
        }
    }
    return children;
};

var stripComments = function (string) {
    return string.replace(/\/\*.+?\*\//g, '');
};

var stripFormatting = function (string) {
    return stripNewlines(trimWhitespace(string));
};

var trimWhitespace = function (string) {
    return string.replace(/[ ]+/g, ' ');
};

var stripNewlines = function (string) {
    return string.replace(/\n|\r|\r\n/g, '');
};

module.exports = CssStylesheet;