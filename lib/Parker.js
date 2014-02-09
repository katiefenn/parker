/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore'),
    StylesheetParser = require('./StylesheetParser.js'),
    RuleParser = require('./RuleParser.js'),
    SelectorParser = require('./SelectorParser.js'),
    DeclarationParser = require('./DeclarationParser.js');

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
    var data = {},
        stylesheetParser = new StylesheetParser(),
        ruleParser = new RuleParser(),
        selectorParser = new SelectorParser(),
        declarationParser = new DeclarationParser();

    _.each(stylesheets, function (stylesheet) {
        var stylesheetMetrics = metrics.filter(function (metric) {return metric.type === 'stylesheet'; });
        collateArrayAttributes(data, runMetricsOnNode(stylesheetMetrics, stylesheet));
  
        _.each(stylesheetParser.parse(stylesheet).children, function (rule) {
            var ruleMetrics = metrics.filter(function (metric) {return metric.type === 'rule'; });
            collateArrayAttributes(data, runMetricsOnNode(ruleMetrics, rule));

            var children = ruleParser.parse(rule);
            _.each(children.selectors, function (selector) {
                var selectorMetrics = metrics.filter(function (metric) {return metric.type === 'selector'; });
                collateArrayAttributes(data, runMetricsOnNode(selectorMetrics, selector));

                _.each(selectorParser.parse(selector).identifiers, function (identifier) {
                    var identifierMetrics = metrics.filter(function (metric) {return metric.type === 'identifier'; });
                    collateArrayAttributes(data, runMetricsOnNode(identifierMetrics, identifier));
                });
            });

            _.each(children.declarations, function (declaration) {
                var declarationMetrics = metrics.filter(function (metric) {return metric.type === 'declaration'; }),
                    propertyMetrics = metrics.filter(function (metric) {return metric.type === 'property'; }),
                    valueMetrics = metrics.filter(function (metric) {return metric.type === 'value'; });
                collateArrayAttributes(data, runMetricsOnNode(declarationMetrics, declaration));

                var children = declarationParser.parse(declaration);
                collateArrayAttributes(data, runMetricsOnNode(propertyMetrics, children.property));
                collateArrayAttributes(data, runMetricsOnNode(valueMetrics, children.value));
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

module.exports = Parker;