/*! Parker v0.0.0 - MIT license */

'use strict';

function CssMediaQuery(raw) {
	this.raw = raw;
}

CssMediaQuery.prototype.getQueries = function () {
	var pattern = /@media\w*(.+?)\s?{/,
		queries = pattern.exec(this.raw)[1];

	return queries.split(/ or |,/g).map(trimQuery);
};

CssMediaQuery.prototype.getRules = function () {
    var rules = [],
        depth = 0,
        rule = '';

    for (var index = 0; index < this.raw.length; index++) {
    	if (depth > 0) {
	        rule += this.raw.charAt(index);
	    }
        if (this.raw.charAt(index) === '{') {
            depth ++;
        }
        else if (this.raw.charAt(index) == '}') {
            depth --;
        }

        if (depth === 1 && this.raw.charAt(index) == '}') {
            rules.push(rule.trim());
            rule = '';
        }
    }
    return rules;
};

var trimQuery = function (query) {
	return query.trim();
};

module.exports = CssMediaQuery;