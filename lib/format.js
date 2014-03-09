var _ = require('underscore');


// writes output in human-readable form
exports.human = function (metrics, results) {
    return _.reduce(metrics, function (str, metric) {
        return str + metric.name + ': ' + results[metric.id] + '\n';
    }, '');
};

// writes output as JSON
exports.json = function (metrics, results) {
    var ids = _.map(metrics, function (metric) {
        return metric.id;
    });
    var obj = _.reduce(ids, function (obj, id) {
        obj[id] = results[id];
        return obj;
    }, {});
    return JSON.stringify(obj, null, 4);
};
