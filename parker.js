#!/usr/bin/env node

/*! csstool v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var _ = require('underscore'),
    Parker = require('./lib/Parker'),
    CliController = require('./lib/CliController'),
    ConfigController = require('./lib/ConfigController'),
    metrics = require('./metrics/All'),
    formatters = {
        'human': require('./lib/formatters/Human.js'),
        'json': require('./lib/formatters/Json.js'),
        'csv': require('./lib/formatters/Csv.js'),
        'warnings': require('./lib/formatters/Warnings.js')
    },
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    async = require('async'),
    path = require('path'),
    info = require('./lib/Info'),
    warningFigurePresets = {
        'default': require('./data/warning-figures-default.js'),
        'strict': require('./data/warning-figures-strict.js')
    },
    warningFigures = warningFigurePresets.default,
    surpressColours = false;

if (argv.config) {
    var controller = new ConfigController();
} else {
    var controller = new CliController();
}

controller.on('runPaths', function (filePaths) {
    var stylesheets = [];
    async.each(filePaths, function (filePath, onAllLoad) {
        var onFileLoad = function (err, data) {
            stylesheets.push(data);
        };

        if (!fileIsStylesheet(filePath)) {
            readDirectory(filePath, onFileLoad, onAllLoad);
        }
        else {
            readFile(filePath, function (err, data) { onFileLoad(err, data); onAllLoad();});
        }

    }, function (err) {
        runReport(stylesheets, metrics);
    });
});

controller.on('runStdin', function () {
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

controller.on('showVersion', function () {
    info.version();
    process.exit();
});

controller.on('showHelp', function () {
    info.help();
    process.exit();
});

controller.on('setFormat', function (format) {
    formatter = formatters[format];

    if (!formatter) {
        console.error('Unknown output format: %s', argv.format);
        console.error('  available: ' + Object.keys(formatters).join(' '));
        process.exit(1);
    }
});

controller.on('showNumericOnly', function () {
    metrics = _.filter(metrics, function (metric) {
        return metric.format == 'number';
    });
});

controller.on('setWarningFigures', function (warningFigureSetting) {
    if (_.isString(warningFigureSetting) && warningFigurePresets.hasOwnProperty(warningFigureSetting)) {
        warningFigures = warningFigurePresets[warningFigureSetting];
    }
    else if (_.isObject(warningFigures)) {
        warningFigures = warningFigureSetting;
    }
});

controller.on('setSurpressColours', function () {
    surpressColours = true;
});;

var readDirectory = function (directoryPath, onFileLoad, onAllLoad) {
    fs.readdir(directoryPath, function (err, files) {
        async.each(files, function (file, fileDone) {
            if (!fileIsStylesheet(file)) {
                return fileDone();
            }

            readFile(path.join(directoryPath, file), function(err, fileData) {
                onFileLoad(err, fileData);
                fileDone();
            });
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
    var results = parker.run(stylesheets),
        options = {
            warningFigures: warningFigures || warningFigurePresets.default,
            surpressColours: surpressColours
        };

    console.log(formatter(metrics, results, options));
    process.exit(getExitCode(results, warningFigures));
};

var getExitCode = function (results, warningFigures) {
    var exitCode = 0;

    _.each(warningFigures, function(warningFigure, id) {
        if (results[id] >= warningFigure[1]) {
            exitCode = 1;
        }
    });

    return exitCode;
}

if (module.parent) {
    module.exports = Parker;
} else {
    var parker = new Parker(metrics),
    formatter = formatters['human'];
    if (argv.config) {
        readFile(argv.config, function (err, filedata) {
            controller.dispatch(JSON.parse(filedata));
        });
    } else {
        controller.dispatch(argv);
    }
}
