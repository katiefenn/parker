/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color');

module.exports = function (metrics, results, settings) {
    // formats output as human-friendly text
    var logo = clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS' + "\n";
    return logo + _.reduce(metrics, function (str, metric) {
        var warningFigure = getWarningFigureForMetric(settings.warningFigures, metric.id),
            failFigure = getFailFigureForMetric(settings.warningFigures, metric.id);
        return str + metric.name + ': ' + colourCodeResult(results[metric.id], warningFigure, failFigure) + '\n';
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

function colourCodeResult (result, warningFigure, failFigure) {
    if (result >= failFigure) {
        return clc.red(result);
    }
    else if (result >= warningFigure) {
        return clc.yellow(result);
    }
    else if (result > -1) {
        return clc.green(result);
    }

    return result;
}
