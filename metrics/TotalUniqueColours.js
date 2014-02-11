/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'total-unique-colours',
    name: 'Total Unique Colors',
    type: 'value',
    aggregate: 'length',
    measure: function (value) {
        return getColourHexes(value).map(function (colourHex) {
            return getLongHashForm(colourHex).toUpperCase();
        });
    },
    filter: function (value, index, self) {
        return self.indexOf(value) === index;
    }
};

var getColourHexes = function (value) {
    var colourHexes = value.match(/#[0-9a-fA-F]{3,6}/g);

    if (_.isNull(colourHexes)) {
        colourHexes = [];
    }

    return colourHexes;
};

var getLongHashForm = function (string) {
    if (string.length === 4) {
        var r = string.substring(0, 1),
            g = string.substring(1, 2),
            b = string.substring(2);

        return r + r + g + g + b + b;
    }

    return string;
};