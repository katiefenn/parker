/*! Parker v0.0.0 - MIT license */

'use strict';

var CssRule = require( "../lib/CssRule.js" );

module.exports = {
    id: 'declarations-per-rule',
    name: 'Declarations Per Rule',
    type: 'rule',
    aggregate: 'mean',
    format: 'number',
    measure: function (rule) {
        console.log(rule);
        return (new CssRule(rule)).getDeclarations().length;
    }
};
