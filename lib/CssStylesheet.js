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
        else if (stylesheet.charAt(index) === '}') {
            depth --;
        }

        if (depth === 0 && stylesheet.charAt(index).match(/\}|;/g)) {
            children.push(child.trim());
            child = '';
        }
    }
    return children;
};

function stripComments (string) {
    return string.replace(/\/\*.+?\*\//g, '');
}

function stripFormatting (string) {
    return stripNewlines(trimWhitespace(string));
}

function trimWhitespace (string) {
    return string.replace(/[ ]+/g, ' ');
}

function stripNewlines(string) {
    return string.replace(/\n|\r|\r\n/g, '');
}

function isRule(string) {
    return !isMediaQuery(string) && hasRuleBlock(string) && hasSelectorBlock(string);
}

function isMalformedStatement(string) {
    return !isRule(string) && !isMediaQuery(string);
}

function hasRuleBlock(string) {
    return string.indexOf('{') !== -1 && string.indexOf('}') !== -1;
}

function hasSelectorBlock(string) {
    return string.match(/^[^\{]+/g);
}

function isMediaQuery(string) {
    return string.match(/^@media/g);
}

module.exports = CssStylesheet;
