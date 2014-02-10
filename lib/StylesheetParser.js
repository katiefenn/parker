/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function StylesheetParser() {

}

StylesheetParser.prototype.parse = function (stylesheet) {
    if (stylesheet && stylesheet.length) {
        return parseStylesheet(stripFormatting(stylesheet));
    }

    else return {};
};


var parseStylesheet = function (stylesheet) {
    var children = [];

    _.each(getRules(stylesheet), function (rule) {
        children.push(rule);
    });

    return {
        children: children,
        type: 'stylesheet'
    };
};

var getRules = function (string) {
    var pattern = /[\w\s>\.:\-_#]*\{[\w\s\:\n;\-#\.\(\)%,\/!]*}/g;
    return string.match(pattern);
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

module.exports = StylesheetParser;