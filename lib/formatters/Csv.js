/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color');

module.exports = function (metrics, results) {
    var lineItems = [];
    _.each(metrics, function (metric) {
        lineItems.push('"' + results[metric.id] + '"');
    });

    return lineItems.join(',');
}
