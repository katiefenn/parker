/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color');

module.exports = function (metrics, results) {
    // formats output as JSON
    var ids = _.map(metrics, function (metric) {
        return metric.id;
    });
    var obj = _.reduce(ids, function (obj, id) {
        obj[id] = results[id];
        return obj;
    }, {});
    return JSON.stringify(obj, null, 4);
};

