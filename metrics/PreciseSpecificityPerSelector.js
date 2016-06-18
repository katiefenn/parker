/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');
var CssSelector = require('../lib/CssSelector');
var getSpecificity = require('../lib/PreciseSelectorSpecificity');

module.exports = {
    id: 'precise-specificity-per-selector',
    name: 'Specificity Per Selector (Precise)',
    type: 'selector',
    aggregate: 'mean',
    format: 'number',
    measure: getSpecificity
};
