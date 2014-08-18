# Using Parker as a Package

Parker can be used as a package in scripts. It can be installed using npm like so:

	npm install --save parker
	
Parker can then be used to run metrics on CSS on strings of stylesheet content:

    var Parker = require('parker'),
        metrics = require('./node_modules/parker/metrics/all'),
        parker = new Parker(metrics);

    console.log(parker.run('body {background: #fff;}'));
    
    /*
    { 'total-stylesheets': 1,
	  'total-stylesheet-size': 24,
	  'total-rules': 1,
	  'selectors-per-rule': 1,
	  'total-selectors': 1,
	  'identifiers-per-selector': 1,
	  'specificity-per-selector': 1,
	  'top-selector-specificity': 1,
	  'top-selector-specificity-selector': 'body',
	  'total-id-selectors': 0,
	  'total-identifiers': 1,
	  'total-declarations': 1,
	  'total-unique-colours': 1,
	  'unique-colours': [ '#FFFFFF' ],
	  'total-important-keywords': 0,
	  'total-media-queries': 0,
	  'media-queries': [] }
    */
	
Metrics have a bunch of properties that can help you select which ones you want to use:

    var metrics = require('./node_modules/parker/metrics/all'),
        numericMetrics = metrics.filter(metricIsNumeric),
        topSelectorSpecificityMetric = metrics.filter(metricIsTopSelectorSpecificity),
        selectorMetrics = metrics.filter(metricIsSelectorType);

	function metricIsNumeric(metric) {
		return metric.format == 'number';
	}

	function metricIsTopSelectorSpecificity(metric) {
		return metric.id == 'top-selector-specificity';
	}

	function metricIsSelectorType(metric) {
		return metric.type == 'selector';
	}