/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssStylesheet(raw) {
    this.raw = raw;
}

CssStylesheet.prototype.getRules = function () {
    var rules = [],
        depth = 0,
        rule = '',
        stylesheet = stripFormatting(stripComments(this.raw));

    if (stylesheet.length) {
        for (var index = 0; index < stylesheet.length; index++) {
            rule += stylesheet.charAt(index);
            if (stylesheet.charAt(index) === '{') {
                depth ++;
            }
            else if (stylesheet.charAt(index) == '}') {
                depth --;
            }

            if (depth === 0 && stylesheet.charAt(index) == '}') {
                rules.push(rule);
                rule = '';
            }
        }

        return rules;
    }

    else return {};
};

var stripComments = function (string) {
    return string.replace(/\/\*[^\*]*\*\//g, '');
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