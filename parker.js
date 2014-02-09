/*! csstool v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var _ = require('underscore'),
    Parker = require('./lib/Parker.js'),
    metrics = require('./metrics/All.js'),
    clc = require('cli-color'),
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs');

console.log(clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS');

var parker = new Parker(metrics);

if(argv.f) {
    fs.readFile(argv.f, {encoding: 'utf8'}, function (err, data) {
        var results = parker.run(data);
        _.each(metrics, function(metric) {
            console.log(metric.name + ': ' + results[metric.id]);
        });
    });
}
else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
        var results = parker.run(chunk);
        _.each(metrics, function(metric) {
            console.log(metric.name + ': ' + results[metric.id]);
        });
    });
}