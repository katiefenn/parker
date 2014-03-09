#!/usr/bin/env node

/*! csstool v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var _ = require('underscore'),
    Parker = require('./lib/Parker.js'),
    metrics = require('./metrics/All.js'),
    format = require('./lib/format'),
    clc = require('cli-color'),
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    async = require('async'),
    path = require('path');


var format = argv.json ? format.json: format.human;

if (!argv.json) {
    console.log(clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS');
}

var parker = new Parker(metrics);

if (argv._.length > 0) {
    var stylesheets = [];

    async.each(argv._, function (filename, done) {
        var onComplete = function (err, data) {
            stylesheets.push(data);
        };

        if (filename.indexOf('.css') === -1) {
            fs.readdir(filename, function (err, files) {
                async.each(files, function (file, fileDone) {
                    if (file.indexOf('.css') === -1) {
                        return fileDone();
                    }

                    fs.readFile(path.join(filename, file), {encoding: 'utf8'}, function (err, fileData) {
                        onComplete(err, fileData);
                        fileDone();
                    });
                }, done);
            });
        }
        else {
            fs.readFile(filename, {encoding: 'utf8'}, function (err, fileData) {
                onComplete(err, fileData);
                done();
            });
        }
    }, function (err) {
        var results = parker.run(stylesheets);
        console.log(format(metrics, results));
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
        console.log(format(metrics, results));
    });
}
