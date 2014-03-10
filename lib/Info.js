/*! Parker v0.0.0 - MIT license */

'use strict';

var pkg = require('../package.json');

module.exports = {
    version: function() {
        console.log(pkg.name + ' v' + pkg.version);
    },
    help: function() {
        module.exports.version();

        [
            pkg.description,
            '',
            'Parker runs metrics on your stylesheets and will report on their complexity.',
            '',
            'Usage',
            '-----',
            '',
            'Measuring Local Stylesheets',
            '',
            '    parker a.css b.css c.css',
            '    parker css/',
            '',
            'Measuring a Remote Stylesheet Using Curl',
            '',
            '    curl http://www.katiefenn.co.uk/css/shuttle.css -s | parker',
            '',
            'For more information, see ' + pkg.homepage
        ].forEach(function(str) { console.log(str); });
    }
};
