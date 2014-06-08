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
            'Usage:',
            'parker [arguments] [file...] Run Parker on specified files',
            '',
            'Example Local Usage:',
            'parker styles.css',
            '',
            'Example Stdin Usage:',
            'curl http://www.katiefenn.co.uk/css/shuttle.css -s | parker -s',
            '',
            'Arguments:',
            '',
            '-f                  Set output format (see list of formats)',
            '-h                  Shows help',
            '-n                  Show numeric results only',
            '-s                  Input CSS using stdin',
            '-v                  Show version number of Parker',
            '',
            'Formats Usage:',
            'parker -f "human"',
            '',
            'Formats List:',
            'human               Human-readable, newline separated format (default)',
            'json                JSON',
            '',
            'For more information, see ' + pkg.homepage
        ].forEach(function(str) { console.log(str); });
    }
};
