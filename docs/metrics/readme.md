# Metrics
Parker has a suite of metrics that are useful for measuring stylesheets. What follows is a list of all the metrics that are bundled with Parker. Parker's metrics are modular and it's easy to write your own - find out how [here](#authoring-metrics).

1. [Bundled Metrics](#bundled-metrics)
	1. [Stylesheet Totals](#stylesheet-totals)
		1. [Total Stylesheets](#total-stylesheets)
		2. [Total Stylesheet Size](#total-stylesheet-size)
	2. [Stylesheet Elements](#stylesheet-elements)
		1. [Total Rules](#total-rules)
		2. [Total Selectors](#total-selectors)
		3. [Total Identifiers](#total-identifiers)
		4. [Total Declarations](#total-declarations)
		5. [Selectors Per Rule](#selectors-per-rule)
		6. [Identifiers Per Selectors](#identifiers-per-selector)
	3. [Specificity](#specificity)
		1. [Specificity Per Selector](#specificity-per-selector)
		2. [Top Selector Specificity](#top-selector-specificity)
		3. [Top Selector Specificity Selector](#top-selector-specificity-selector)
	4. [Important Keywords](#important-keywords)
		1. [Total Important Keywords](#total-important-keywords)
	5. [Colors](#colours)
		1. [Total Unique Colours](#total-unique-colours)
		2. [Unique Colours](#unique-colours)
	6. [Media Queries](#media-queries-heading)
		1. [Media Queries](#media-queries)
		2. [Total Media Queries](#total-media-queries)
	
2. [Authoring Metrics](#authoring-metrics)
	1. [Attributes](#attributes)
		1. [id](#id)
		2. [name](#name)
		3. [type](#type)
		4. [aggregate](#aggregate)
		5. [format](#format)
	2. [Methods](#methods)
		1. [measure](#measure)
		2. [filter](#filter)
		3. [iterator](#iterator)	

<a name="bundled-metrics"></a>
## [Bundled Metrics](#bundled-metrics)

<a name="stylesheet-totals"></a>
### Stylesheet Totals
Basic metrics that influence stylesheet and HTTP performance.

<a name="total-stylesheets"></a>
#### Total Stylesheets
The number of stylesheets measured. This is the number of stylesheets submitted to Parker in a single report, and can be used to track how many stylesheets are requested in your application. Each stylesheet is downloaded over a HTTP request, which affects performance. Generally, fewer HTTP requests improves performance.

- __id__: total-stylesheets
- __name__: Total Stylesheets
- __type__: stylesheet
- __aggregate__: sum
- __format__: number

<a name="stylesheet-size"></a>
#### Total Stylesheet Size
Measures the total file size of stylesheets measured. Each stylesheet is downloaded over a HTTP request, and the size of the request affects performance. Smaller HTTP request file sizes improves performance.

- __id__: total-stylesheet-size
- __name__: Total Stylesheet Size
- __type__: stylesheet
- __aggregate__: sum
- __format__: number

<a name="stylesheet-elements"></a>
### Stylesheet Elements
Stylesheet size can be broken down into the total number of its parts: rules, selectors, identifiers and declarations.

<a name="total-rules"></a>
#### Total Rules
Measures the total number of rules. Each rule defines a specific behaviour of the design. Stylesheets with fewer rules are simpler.

- __id__: total-rules
- __name__: Total Rules
- __type__: rule
- __aggregate__: sum
- __format__: number


#### Total Selectors
Measures the total number of selectors. Each selector defines a group of elements affected by the design. Stylesheets with fewer selectors are simpler.

- __id__: total-selectors
- __name__: Total Selectors
- __type__: selector
- __aggregate__: sum
- __format__: number

<a name="total-identifiers"></a>
#### Total Identifiers
Measures the total number of identifiers. Each identifier defines a group of elements affected by the design. Stylesheets with fewer identifiers are simpler. It can be useful to break measure identifiers as well as identifiers so that small code changes to selectors can be tracked.

- __id__: total-identifiers 
- __name__: Total Identifiers
- __type__: identifier
- __aggregate__: sum
- __format__: number

<a name="total-declarations"></a>
#### Total Declarations
Measures the total number of property declarations. Each property declaration defines a modification of the appearance or function of an element. Stylesheets with fewer property declarations are simpler.

- __id__: total-declarations
- __name__: Total Declarations
- __type__: declaration
- __aggregate__: sum
- __format__: number

#### Selectors Per Rule
Measures the average number of selectors in every rule. Stylesheet rules can be applied to several groups of elements using multiple selectors, separated by a comma. Fewer selectors in a rule makes its properties specific to a smaller group of elements, and also makes a rule easier to read in text editors and developer tools.

- __id__: total-important-keywords
- __name__: Total Important Keywords
- __type__: value
- __aggregate__: sum
- __format__: number

#### Identifiers Per Selector
Measures the average number of identifiers in every selector. Selectors can be made more specific to combinations of elements by adding more identifiers to a selector. Fewer identifiers in a given selector reduces its dependency on certain DOM structures, allowing more changes to your HTML before being forced to change your CSS. Selectors with fewer identifiers are also more readable.

- __id__: identifiers-per-selector
- __name__: Identifiers Per Selector
- __type__: selector
- __aggregate__: mean
- __format__: number

<a name="specificity"></a>
### Specificity
A rule can be overrided by another rule with a more specific selector. Complexity is added to stylesheets when multiple levels of cascading rules are used in stylesheets, because it becomes more difficult to predict which properties apply to a given element without keeping in mind other rules.

<a name="specificity-per-selector"></a>
#### Specificity Per Selector
Measures the average specificity of selectors. Lower average specificity makes it easier to combine and re-use properties defined in other, less-specific rules.

- __id__: specificity-per-selector
- __name__: Specificity Per Selector
- __type__: selector
- __aggregate__: mean
- __format__: number

<a name="top-selector-specificity"></a>
#### Top Selector Specificity
Measures the specificity of the most specific selector. Reducing the specificity of the most complex selectors is a good way to reducing the overall complexity of a stylesheet.

- __id__: top-selector-specificity
- __name__: Top Selector Specificity
- __type__: selector
- __aggregate__: max
- __format__: number

<a name="top-selector-specificity-selector"></a>
#### Top Selector Specificity Selector
Displays the most specific selector. Reducing the specificity of the most complex selectors is a good way to reducing the overall complexity of a stylesheet.

- __id__: top-selector-specificity-selector
- __name__: Top Selector Specificity Selector
- __type__: selector
- __aggregate__: max
- __format__: string

<a name="important-keywords"></a>
### Important Keywords
The !important keyword supersedes selector specificity, even allowing properties to be enforced over properties of rules with high specificity selectors. Because !important is so powerful, it should be reserved for use for architectural purposes, enforcing styles in user stylesheets and utility classes. Using !important to overcome issues with specificity exasperates the problem.

<a name="total-important-keywords"></a>
#### Total Important Keywords
Measures the total instances of the !important keyword. Fewer !important keywords indicates a simpler stylesheet.

- __id__: total-important-keywords
- __name__: Total Important Keywords
- __type__: value
- __aggregate__: sum
- __format__: number

<a name="colours"></a>
### Colours
Colour is an important part of design, and highlights important elements such as buttons, sections and text. A consistent colour scheme is a good way of guiding users around a site. An excessive number of colours indicates an overly-complex colour scheme, or inconsistent use of colour that forces an over-reliance of developers on design documents.

<a name="total-unique-colours"></a>
#### Total Unique Colours
Measures the number of unique colour hashes used in a stylesheet. Fewer colours indicates a simpler colour scheme.

- __id__: total-unique-colours
- __name__: Total Unique Colors
- __type__: value
- __aggregate__: length
- __format__: number

<a name="unique-colours"></a>
#### Unique Colours
Lists the unique colour hashes used in a stylesheet. Identifying and reducing unique colours is a good way to simplify colour schemes.

- __id__: unique-colours
- __name__: Unique Colors
- __type__: value
- __aggregate__: list
- __format__: list

<a name="media-queries-heading"></a>
### Media Queries
Media queries contain rules that change the behaviour of documents according to the sort of device or its state. They're commonly used to create breakpoints in responsive web design behaviour. Each unique media query adds complexity by changing behaviour when a given criteria is met by the device.

<a name="media-queries"></a>
#### Media Queries
Lists every unique media query used. Reducing unique media queries is a good way to simplify stylesheets.

- __id__: media-queries
- __name__: Media Queries
- __type__: mediaquery
- __aggregate__: list'
- __format__: list

<a name="total-media-queries"></a>
#### Total Media Queries
Measures the number of unique media queries used. Fewer media queries indicates a simpler stylesheet.

- __id__: total-media-queries
- __name__: Total Media Queries
- __type__: mediaquery
- __aggregate__: length
- __format__: number

<a name="authoring-metrics"></a>
## Authoring Metrics
Parker's stylesheets are modular, and there are several attributes and methods a metric can implement to access Parker's metric features.

<a name="attributes"></a>
### Attributes
<a name="id"></a>
#### id
The unique identifier of the metric and is used when selecting metrics to be run.

<a name="name"></a>
#### name
The natural language name of the metric and is used when reporting results.

<a name="type"></a>
#### type
The type of stylesheet elements the metric is run against.

Available types:

- stylesheet
- rule
- selector
- identifier
- declaration
- property
- value
- mediaquery

<a name="aggregate"></a>
#### aggregate
The operation applied to data collected by metrics on elements before results are reported.

Available aggregates:

- __sum__: will sum number values
- __mean__: will average number values by mean
- __max__: will select the maximum of number values after iterator function is applied
- __list__: will list all collected values after filter function is applied
- __length__: will display the number of collected values after filter function is applied

<a name="format"></a>
#### format
The output format of the end result. Used for selecting metrics for use in scripts.

Available formats:

- number
- list
- string

<a name="methods"></a>
### Methods
<a name="measure"></a>
#### measure
	metric.measure(element)
Measures an element of css "element" and returns a measurement to be reported. This is the main method that measures elements that all metrics must implement.

Example:
The Stylesheet Size measure method returns a simple number measurement, which is summed on aggregate.

	module.exports = {
    	id: 'total-stylesheet-size',
	    name: 'Total Stylesheet Size',
    	type: 'stylesheet',
	    aggregate: 'sum',
    	format: 'number',
	    measure: function (stylesheet) {
    	    return byteCount(stylesheet);
	    }
	};
	
	function byteCount(s) {
    	return encodeURI(s).split(/%..|./).length - 1;
	}

<a name="filter"></a>
#### filter
	metric.filter(predicate)
Filters list-aggregated results based on the truth-test "predicate" function.

Predicate parameters:

- __value__: the value of the measurement
- __index__: the index of the item in all measurements the metric has collected
- __list__: the current list of all measurements to compare the current item to

Example:
The Total Media Queries returns the query to be collected into a list. Before reporting, the filter method is run on the list, removing duplicate queries by returning a true or false value according to whether it is the only such item in the list. The length aggregate returns the number of queries collected after filtering.

	module.exports = {
    	id: 'total-media-queries',
	    name: 'Total Media Queries',
    	type: 'mediaquery',
	    aggregate: 'length',
    	format: 'number',
	    measure: function (query) {
    	    return query;
	    },
    	filter: function (value, index, list) {
	        return self.indexOf(value) === index;
    	}
	};

<a name="iterator"></a>
#### iterator
	metric.iterator(element)
A helper method of "max" aggregated metrics that returns a number value for the given element. Used to determine which item should be selected as the maximum value when the measurement returned by the measurement method is not a number value. When the method is not defined, the measurement returned by "measure" is used instead.

Example:
The Top Selector Specificity Selector metric returns the most specific selector, but does not report a number value. An iterator method is used to determine the selector's specificity when results are aggregated.

	module.exports = {
    	id: 'top-selector-specificity-selector',
	    name: 'Top Selector Specificity Selector',
    	type: 'selector',
	    aggregate: 'max',
    	format: 'string',
	    measure: function (selector) {
    	    return selector;
	    },
    	iterator: function (selector) {
	        var identifiers = getIdentifiers(selector),
    	        specificity = 0;
	
			/*
				Implementation calculating specificity cut for brevity
				...			
			*/
	
    	    return specificity;
	    }
	};


