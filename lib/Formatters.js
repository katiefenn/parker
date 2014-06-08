/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color');


// formats output as human-friendly text
exports.human = function (metrics, results) {
    var logo = clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS' + "\n";
    return logo + _.reduce(metrics, function (str, metric) {
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

exports.csv = function (metrics, results) {
    var lineItems = [];
    _.each(metrics, function (metric) {
        lineItems.push('"' + results[metric.id] + '"');
    });

    return lineItems.join(',');
}