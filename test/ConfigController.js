/*! Parker v0.0.0 - MIT license */

var chai = require('chai'),
    expect = require('chai').expect,
    ConfigController = require('../lib/ConfigController.js'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('The Config Controller', function() {
    it('responds to a "files" setting by dispatching a files event', function () {
        var callback = sinon.spy(),
            files = ['path/to/files.js']
            configController = new ConfigController();

        configController.on('runPaths', callback);
        configController.dispatch({'files': files});
        expect(callback).to.have.been.calledWith(files);
    });

    it('responds to a "show-numeric-only" setting by dispatching a files event', function () {
        var callback = sinon.spy(),
            files = ['path/to/files.js']
            configController = new ConfigController();

        configController.on('showNumericOnly', callback);
        configController.dispatch({'show-numeric-only': true});
        expect(callback).to.have.been.called;
    });

    it('responds to a "format" setting by dispatching a format event', function () {
        var callback = sinon.spy(),
            configController = new ConfigController();

        configController.on('setFormat', callback);
        configController.dispatch({'format': 'json'});
        expect(callback).to.have.been.calledWith('json');
    });

    it('responds to a "warning-figures" setting by dispatching a custom warning figures event', function () {
        var callback = sinon.spy(),
            warningFigures = {'top-selector-specificity': [50, 99]},
            configController = new ConfigController();

        configController.on('customWarningFigures', callback);
        configController.dispatch({'warning-figures': warningFigures});
        expect(callback).to.have.been.calledWith(warningFigures);
    });
});
