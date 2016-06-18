/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');
var CssSelector = require('../lib/CssSelector');
var getSpecificity = require('../lib/PreciseSelectorSpecificity');

module.exports = {
    id: 'precise-top-selector-specificity',
    name: 'Top Selector Specificity (Precise)',
    type: 'selector',
    aggregate: 'max',
    format: 'number',
    measure: getSpecificity
};
