/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'total-stylesheet-size',
    name: 'Total Stylesheet Size',
    type: 'stylesheet',
    aggregate: 'sum',
    format: 'number',
    measure: function (stylesheet) {
        return byteCount(stylesheet);
    }
};

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}