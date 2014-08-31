/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    clc = require('cli-color'),
    colourCodedLogo = clc.red('PA') + clc.yellow('RK') + clc.green('ER') + '-JS' + "\n",
    nonColourCodedLogo = "PARKER-JS\n";

module.exports = function (metrics, results, settings) {
    var reportLines = [];

    // formats output as warning list
    if (settings.surpressColours) {
        var logo = nonColourCodedLogo;
    } else {
        var logo = colourCodedLogo;
    }

    metrics = metrics.filter(function (metric) {
        return settings.warningFigures.hasOwnProperty(metric.id);
    });

    _.each(metrics, function (metric) {
        if (settings.surpressColours) {
            reportLines.push(getWarningTextForMetric(results, settings.warningFigures, metric.id, metric.name));
        } else {
            reportLines.push(getColourCodedWarningTextForMetric(results, settings.warningFigures, metric.id, metric.name));
        }
    }, '');

    return logo + _.compact(reportLines).join("\n");
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

function getWarningTextForMetric(results, warningFigures, metricId, metricName) {
        var warningFigure = getWarningFigureForMetric(warningFigures, metricId),
            failFigure = getFailFigureForMetric(warningFigures, metricId);
        if (results[metricId] && results[metricId] >= failFigure) {
            return "Failure: " + metricName + ": " + results[metricId];
        }
        else if (results[metricId] && results[metricId] >= warningFigure) {
            return "Warning: " + metricName + ": " + results[metricId];
        }

        return '';
}

function getColourCodedWarningTextForMetric(results, warningFigures, metricId, metricName) {
    var warningText = getWarningTextForMetric(results, warningFigures, metricId, metricName);

    if (warningText == '') {
        return '';
    }

    if (warningText.indexOf('Warning:') >= 0) {
        return clc.yellow(warningText);
    }

    return clc.red(warningText);
}

