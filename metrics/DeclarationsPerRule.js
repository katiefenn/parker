'use strict';

var CssRule = require('../lib/CssRule');

var _ = require('lodash');
module.exports = {
    id: 'declarations-per-rule',
    name: 'Declarations Per Rule',
    type: 'rule',
    aggregate: 'mean',
    format: 'number',
    measure: function (raw) {
        var rule = new CssRule(raw);
        return rule.getDeclarations().length;
    }
};
