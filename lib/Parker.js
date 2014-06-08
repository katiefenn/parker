/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    CssStylesheet = require('./CssStylesheet.js'),
    CssRule = require('./CssRule.js'),
    CssSelector = require('./CssSelector.js'),
    CssDeclaration = require('./CssDeclaration.js'),
    CssMediaQuery = require('./CssMediaQuery.js');

var VALID_METRIC_TYPE = /stylesheet|rule|selector|identifier|declaration|property|value|mediaquery/g;

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
    var readings = [];

    _.each(stylesheets, function (rawStylesheet) {
        readings.push(runMetricsOnNode(metrics, rawStylesheet, 'stylesheet'));
  
        var stylesheet = new CssStylesheet(rawStylesheet),
            rules = stylesheet.getRules() || [];

        _.each(stylesheet.getMediaQueries(), function (rawMediaQuery) {
            var mediaQuery = new CssMediaQuery(rawMediaQuery);
            _.each(mediaQuery.getQueries(), function (query) {
                readings.push(runMetricsOnNode(metrics, query, 'mediaquery'));
            });

            rules = rules.concat(mediaQuery.getRules());
        });

        _.each(rules, function (rawRule) {
            readings.push(runMetricsOnNode(metrics, rawRule, 'rule'));

            var rule = new CssRule(rawRule);
            _.each(rule.getSelectors(), function (rawSelector) {
                var selector = new CssSelector(rawSelector);
                readings.push(runMetricsOnNode(metrics, rawSelector, 'selector'));

                _.each(selector.getIdentifiers(), function (rawIdentifier) {
                    readings.push(runMetricsOnNode(metrics, rawIdentifier, 'identifier'));
                });
            });

            _.each(rule.getDeclarations(), function (rawDeclaration) {
                var declaration = new CssDeclaration(rawDeclaration);

                readings.push(runMetricsOnNode(metrics, rawDeclaration, 'declaration'));
                readings.push(runMetricsOnNode(metrics, declaration.getProperty(), 'property'));
                readings.push(runMetricsOnNode(metrics, declaration.getValue(), 'value'));
            });
        });
    });

    var data = readings.reduce(mergeArrayAttributes);
    data = aggregateData(data, metrics);

    return data;
};

var runMetricsOnNode = function (metrics, node, type) {
    var data = {};
    _.each(filterMetricsByType(metrics, type), function (metric) {
        var measurement = metric.measure(node);
        if (!_.isArray(measurement)) {
            measurement = [measurement];
        }

        data[metric.id] = measurement;
    });

    return data;
};

var aggregateData = function (data, metrics) {
    _.each(metrics, function (metric) {
        if (!data[metric.id]) {
            data[metric.id] = [];
        }
        switch (metric.aggregate) {
            case 'sum':
                data[metric.id] = aggregateSum(data[metric.id]);
                break;
            case 'mean':
                data[metric.id] = aggregateMean(data[metric.id]);
                break;
            case 'max':
                data[metric.id] = aggregateMax(data[metric.id], metric.iterator);
                break;
            case 'list':
                data[metric.id] = aggregateList(data[metric.id], metric.filter);
                break;
            case 'length':
                data[metric.id] = aggregateLength(data[metric.id], metric.filter);
                break;
        }
    });

    return data;
};

var aggregateSum = function (data) {
    return sum(data);
};

var aggregateMean = function (data) {
    if (data.length === 0) {
        return 0;
    }
    return mean(data);
};

var aggregateMax = function (data, iterator) {
    if (data.length === 0) {
        return 0;
    }
    if (_.isUndefined(iterator)) {
        return _.max(data);
    }

    return _.max(data, iterator);
};

var aggregateList = function (data, filter) {
    if (!_.isUndefined(filter)) {
        return _.compact(data.filter(filter));
    }

    return _.compact(data);
};

var aggregateLength = function (data, filter) {
    if (!_.isUndefined(filter)) {
        return data.filter(filter).length;
    }

    return _.compact(data).length;
};

var mergeArrayAttributes = function (target, source) {
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

    return target;
};

var sum = function (values) {
    if (values.length === 0) {
        return 0;
    }
    return values.reduce(function (previous, current) {return previous + current; });
};

var mean = function (values) {
    var valuesSum = sum(values);

    return valuesSum / values.length;
};

var filterMetricsByType = function (metrics, type) {
    if (type) {
        return metrics.filter(function (metric) {return metric.type === type; });
    }

    return metrics;
};

module.exports = Parker;