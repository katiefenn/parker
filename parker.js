#!/usr/bin/env node

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

if (argv._.length > 0) {
    var stylesheets = [];
    _.each(argv._, function (filename) {
        var onComplete = function (err, data) {
            stylesheets.push(data);
            if (stylesheets.length === argv._.length) {
                onAllComplete();
            }
        };

        var onAllComplete = function () {
            var results = parker.run(stylesheets);
            _.each(metrics, function(metric) {
                console.log(metric.name + ': ' + results[metric.id]);
            });
        };

        fs.readFile(filename, {encoding: 'utf8'}, onComplete);
    });
}
else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var stdinData = '';

    process.stdin.on('data', function(chunk) {
        stdinData += chunk;
    });

    process.stdin.on('end', function() {
        var results = parker.run(stdinData);
        _.each(metrics, function(metric) {
            console.log(metric.name + ': ' + results[metric.id]);
        });
    });
}
