/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    CssStylesheet = require('./CssStylesheet.js'),
    CssRule = require('./CssRule.js'),
    CssSelector = require('./CssSelector.js'),
    CssDeclaration = require('./CssDeclaration.js');

var VALID_METRIC_TYPE = /stylesheet|rule|selector|identifier|declaration|property|value/g;

function Parker(metrics) {
    this.metrics = metrics;
}

Parker.prototype.run = function () {
    var args = arguments;

    if (arguments.length === 1 && _.isArray(arguments[0])) {
        args = arguments[0];
    }

    args = _.filter(args, function (argument) {return _.isString(argument); });
    var metrics = _.filter(this.metrics, function (metric) {return metric.type.match(VALID_METRIC_TYPE); });

    if (args.length > 0) {
        return runMetrics(metrics, args);
    }

    throw {'message': 'No valid stylesheet data supplied', 'name': 'DataTypeException'};
};

var runMetrics = function (metrics, stylesheets) {
    var data = {};

    _.each(stylesheets, function (rawStylesheet) {
        collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'stylesheet'), rawStylesheet));
  
        var stylesheet = new CssStylesheet(rawStylesheet);
        _.each(stylesheet.getRules(), function (rawRule) {
            collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'rule'), rawRule));

            var rule = new CssRule(rawRule);
            _.each(rule.getSelectors(), function (rawSelector) {
                var selector = new CssSelector(rawSelector);
                collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'selector'), rawSelector));

                _.each(selector.getIdentifiers(), function (rawIdentifier) {
                    collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'identifier'), rawIdentifier));
                });
            });

            _.each(rule.getDeclarations(), function (rawDeclaration) {
                var declaration = new CssDeclaration(rawDeclaration);

                collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'declaration'), rawDeclaration));
                collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'property'), declaration.getProperty()));
                collateArrayAttributes(data, runMetricsOnNode(filterMetricsByType(metrics, 'value'), declaration.getValue()));
            });
        });
    });

    data = aggregateData(data, metrics);

    return data;
};

var runMetricsOnNode = function (metrics, node) {
    var data = {};
    _.each(metrics, function (metric) {
        data[metric.id] = metric.measure(node);
    });

    return data;
};

var aggregateData = function (data, metrics) {
    _.each(metrics, function (metric) {
        if (metric.aggregate === 'sum') {
            data[metric.id] = sum(data[metric.id]);
        }
        else if (metric.aggregate === 'mean') {
            data[metric.id] = mean(data[metric.id]);
        }
        else if (metric.aggregate === 'max') {
            if (_.isUndefined(metric.iterator)) {
                data[metric.id] = _.max(data[metric.id]);
            } else {
                data[metric.id] = _.max(data[metric.id], metric.iterator);
            }
        }
        else if (metric.aggregate === 'list') {
            if (!_.isUndefined(metric.filter)) {
                data[metric.id] = data[metric.id].filter(metric.filter);
            }

            data[metric.id] = _.compact(data[metric.id]);
        }
        else if (metric.aggregate === 'length') {
            if (!_.isUndefined(metric.filter)) {
                data[metric.id] = data[metric.id].filter(metric.filter);
            }

            data[metric.id] = _.compact(data[metric.id]).length;
        }
    });

    return data;
};

var collateArrayAttributes = function () {
    var sources = _.toArray(arguments),
        target = sources.shift();

    _.each(sources, function (source) {
        _.each(source, function (attribute, attributeName) {
            if  (!_.has(target, attributeName)) {
                target[attributeName] = [];
            }

            if (!_.isUndefined(attribute)) {
                if (_.isString(attribute)) {
                    attribute = [attribute];
                }

                target[attributeName] = target[attributeName].concat(attribute);
            }
        });
    });

    return target;
};

var sum = function (values) {
    return values.reduce(function (previous, current) {return previous + current; });
};

var mean = function (values) {
    var valuesSum = sum(values);

    return valuesSum / values.length;
};

var filterMetricsByType = function (metrics, type) {
    return metrics.filter(function (metric) {return metric.type === type; })
}

module.exports = Parker;