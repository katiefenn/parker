/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');

function CliFormatter() {

}

CliFormatter.prototype.format = function (data, metrics) {
	var output = '';
    _.each(metrics, function(metric) {
        output += metric.name + ": " + data[metric.id];
        output += "\n";
    });

	return output;
};

module.exports = CliFormatter;
