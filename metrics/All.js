/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = [
    // Stylesheet metrics
    require('./TotalStylesheets.js'),
    require('./TotalStylesheetSize.js'),

    // Rule metrics
    require('./SelectorsPerRule.js'),

    // Selector metrics
    require('./IdentifiersPerSelector.js'),
    require('./TotalSelectors.js'),
    require('./SpecificityPerSelector.js'),
    require('./TopSelectorSpecificity.js'),
    require('./TopSelectorSpecificitySelector.js'),

    // Identifier metrics
    require('./TotalIdentifiers.js'),

    // Declaration metrics
    require('./TotalUniqueColours.js'),
    require('./UniqueColours.js')
];