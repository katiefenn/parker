/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');
var CssSelector = require('../lib/CssSelector');
var getSpecificity = require('../lib/ArraySelectorSpecificity');

module.exports = {
    id: 'string-top-selector-specificity',
    name: 'Top Selector Specificity (String)',
    type: 'selector',
    aggregate: 'reduce',
    format: 'string',
    initial: '0,0,0',
    measure: function(selector) {
        return selector;
    },
    reduce: function(previous, current) {
        var previousSpecificity = fromString(previous);
        var currentSpecificity = getSpecificity(current);

        return toString(mostSpecific(previousSpecificity, currentSpecificity));
    }
};

function toString(arr) {
    return arr.map(function(item) {
        return item.toString();
    }).join(',');
}

function fromString(str) {
    return str.split(',').map(function(item) {
      return parseInt(item);
    });
}

function mostSpecific(arr1, arr2) {
    var arr1Specificity = (arr1[0] * 65536) + (arr1[1] * 256) + (arr1[2] * 1);
    var arr2Specificity = (arr2[0] * 65536) + (arr2[1] * 256) + (arr2[2] * 1);

    if (arr1Specificity > arr2Specificity) {
      return arr1;
    }

    return arr2;
}
