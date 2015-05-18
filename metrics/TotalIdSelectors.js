
/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');

module.exports = {
    id: 'total-id-selectors',
    name: 'Total Id Selectors',
    type: 'selector',
    aggregate: 'sum',
    format: 'number',
    measure: function (selector) {
		var ids = 0;
		var inBrackets = false;

		_.forOwn(selector, function (char) {
			if (char === '[') {
				inBrackets = true;
			} else if (char === ']') {
				inBrackets = false;
			} else if (char === '#' && !inBrackets) {
				ids++;
			}
		});

		return ids;
    }
};
