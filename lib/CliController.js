/*! Parker v0.0.0 - MIT license */

'use strict';

var util = require('util'),
    events = require('events');

function CliController() {
    events.EventEmitter.call(this);
}

util.inherits(CliController, events.EventEmitter);

CliController.prototype.dispatch = function (argv) {
    if (argv.v || argv.version) {
        this.emit('showVersion');
    }
    if (argv.h || argv.help) {
        this.emit('showHelp');
    }
    if (argv.f || argv.format) {
        var format = argv.f || argv.format;
        this.emit('setFormat', format);
    }
    if (argv.n || argv.numeric) {
        this.emit('showNumericOnly');
    }
    if (argv._ && argv._.length) {
        this.emit('runPaths', argv._);
    }
    else if (argv.s || argv.stdin) {
        this.emit('runStdin');
    }
    else {
        // No data supplied - show help
        this.emit('showHelp');
    }
};

module.exports = CliController;