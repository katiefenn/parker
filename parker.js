#!/usr/bin/env node

/*! csstool v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var _ = require('lodash'),
    Parker = require('./lib/Parker'),
    CliController = require('./lib/CliController'),
    metrics = require('./metrics/All'),
    formatters = require('./lib/Formatters'),
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('graceful-fs'),
    async = require('async'),
    path = require('path'),
    info = require('./lib/Info');

var cliController = new CliController();

cliController.on('runPaths', function (filePaths) {
    var stylesheets = [];
    async.each(filePaths, function (filePath, onAllLoad) {
        var onFileLoad = function (err, data) {
            stylesheets.push(data);
        };
        read(filePath, onFileLoad, onAllLoad);
    }, function (err) {
        runReport(stylesheets, metrics);
    });
});

cliController.on('runStdin', function () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var stdinData = '';

    process.stdin.on('data', function(chunk) {
        stdinData += chunk;
    });

    process.stdin.on('end', function() {
        runReport(stdinData, metrics);
    });
});

cliController.on('showVersion', function () {
    info.version();
    process.exit();
});

cliController.on('showHelp', function () {
    info.help();
    process.exit();
});

cliController.on('setFormat', function (format) {
    formatter = formatters[format];

    if (!formatter) {
        console.error('Unknown output format: %s', argv.format);
        console.error('  available: ' + Object.keys(formatters).join(' '));
        process.exit(1);
    }
});

cliController.on('showNumericOnly', function () {
    metrics = _.filter(metrics, function (metric) {
        return metric.format == 'number';
    });
});

var read = function (filePath, onFileLoad, onAllLoad) {
    if (fs.lstatSync(filePath).isDirectory()) {
        readDirectory(filePath, onFileLoad, onAllLoad);
    }
    else if (fileIsStylesheet(filePath)) {
        readFile(filePath, function (err, data) {
            onFileLoad(err, data);
            onAllLoad();
        });
    } else {
        onAllLoad();
    }
}

var readDirectory = function (directoryPath, onFileLoad, onAllLoad) {
    fs.readdir(directoryPath, function (err, files) {
        async.each(files, function (file, fileDone) {
            read(path.join(directoryPath, file), onFileLoad, fileDone);
        }, onAllLoad);
    });
};

var readFile = function (filePath, onLoad) {
    fs.readFile(filePath, {encoding: 'utf8'}, function (err, fileData) {
        onLoad(err, fileData);
    });
};

var fileIsStylesheet = function (filePath) {
    return filePath.indexOf('.css') !== -1;
};

var runReport = function (stylesheets, metrics) {
    var results = parker.run(stylesheets);
    console.log(formatter(metrics, results));
};

if (module.parent) {
    module.exports = Parker;
} else {
    var parker = new Parker(metrics),
    formatter = formatters['human'];
    cliController.dispatch(argv);
}
