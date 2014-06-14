/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssStylesheet(raw) {
    this.raw = raw;
}

CssStylesheet.prototype.getRules = function () {
    this.children = this.children || getChildren(this.raw);

    return this.children.filter(function (child) {
        return isRule(child);
    });
};

CssStylesheet.prototype.getMalformedStatements = function () {
    this.children = this.children || getChildren(this.raw);

    return this.children.filter(function (child) {
        return isMalformedStatement(child);
    });
};

CssStylesheet.prototype.getMediaQueries = function () {
    this.children = this.children || getChildren(this.raw);
    return this.children.filter(function (child) {
        return isMediaQuery(child);
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

var isRule = function (string) {
    return !isMediaQuery(string) && hasRuleBlock(string) && hasSelectorBlock(string);
}

var isMalformedStatement = function (string) {
    return !isRule(string) && !isMediaQuery(string);
}

var hasRuleBlock = function (string) {
    return string.indexOf('{') !== -1 && string.indexOf('}') !== -1;
}

var hasSelectorBlock = function (string) {
    return string.match(/^[^\{]+/g)
}

var isMediaQuery = function (string) {
    return string.match(/^@media/g);
}

module.exports = CssStylesheet;