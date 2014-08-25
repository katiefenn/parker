/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color');

module.exports = function (metrics, results, settings) {
    // formats output as warning list
    var logo = clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS' + "\n";

    metrics = metrics.filter(function (metric) {
        return settings.warningFigures.hasOwnProperty(metric.id);
    });

    return logo + _.reduce(metrics, function (str, metric) {
        var warningFigure = getWarningFigureForMetric(settings.warningFigures, metric.id),
            failFigure = getFailFigureForMetric(settings.warningFigures, metric.id);
        if (results[metric.id] && results[metric.id] >= failFigure) {
            return str + clc.red("Failure: " + metric.name + ": " + results[metric.id]) + '\n';
        }
        else if (results[metric.id] && results[metric.id] >= warningFigure) {
            return str + clc.yellow("Warning: " + metric.name + ": " + results[metric.id]) + '\n';
        }

        return str;
    }, '');
};

function getWarningFigureForMetric(warningFigures, metricId) {
    if (warningFigures[metricId]) {
        return warningFigures[metricId][0];
    }

    return -1;
}

function getFailFigureForMetric(warningFigures, metricId) {
    if (warningFigures[metricId]) {
        return warningFigures[metricId][1];
    }

    return -1;
}
