/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');


// formats output as human-friendly text
exports.human = function (metrics, results) {
    return _.reduce(metrics, function (str, metric) {
        return str + metric.name + ': ' + results[metric.id] + '\n';
    }, '');
};

// formats output as JSON
exports.json = function (metrics, results) {
    var ids = _.map(metrics, function (metric) {
        return metric.id;
    });
    var obj = _.reduce(ids, function (obj, id) {
        obj[id] = results[id];
        return obj;
    }, {});
    return JSON.stringify(obj, null, 4);
};
