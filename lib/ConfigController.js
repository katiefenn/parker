/*! Parker v0.0.0 - MIT license */

'use strict';

var util = require('util'),
    events = require('events');

function ConfigController() {
    events.EventEmitter.call(this);
}

util.inherits(ConfigController, events.EventEmitter);

ConfigController.prototype.dispatch = function (config) {
    if (config.files) {
        this.emit('runPaths', config.files); 
    }
    if (config.format) {
        this.emit('setFormat', config.format);
    }
    if (config['show-numeric-only']) {
        this.emit('showNumericOnly');
    }
    if (config['warning-figures']) {
        this.emit('customWarningFigures', config['warning-figures']);
    }
};

module.exports = ConfigController;
