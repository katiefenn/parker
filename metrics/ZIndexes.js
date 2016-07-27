/*! Parker v0.0.0 - MIT license */

'use strict';

var CssDeclaration = require('../lib/CssDeclaration');

module.exports = {
    id: 'z-indexes',
    name: 'Z-Indexes',
    type: 'declaration',
    aggregate: 'list',
    format: 'list',
    measure: function (raw) {
        var declaration = new CssDeclaration(raw);

        if (declaration.getProperty() == "z-index") {
          return declaration.getValue();
        }
    },
    filter: function (value, index, self) {
        return value != undefined && self.indexOf(value) === index;
    }
};
