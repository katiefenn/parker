/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect
    exec = require('child_process').exec;

describe('The Parker CLI tool', function () {
    it('should load settings from a config file when invoked with a --config="" switch', function (done) {
        exec('node parker.js --config="test/fixtures/minimal-config.json"', function (err, stdout, stderr) {
            expect(stdout).to.not.contain('Usage:');
            expect(stdout).to.contain('Total Stylesheets');
            done();
        });
    });

    it('should load custom warning figures when invoked with a config file containing them', function (done) {
        exec('node parker.js --config="test/fixtures/config-with-warning-figures.json"', function (err, stdout, stderr) {
            expect(stdout).to.not.contain('Failure: Top Selector Specificity');
            expect(stdout).to.contain('Warning: Total Unique Colours');
            expect(stdout).to.contain('Failure: Selectors Per Rule');
            done();
        });
    });

    it('should display usage information when invoked with a -h or --help switch', function (done) {
        exec('node parker.js -h', function (err, stdout, stderr) {
            expect(stdout).to.contain('Usage:');
            done();
        });
    });

    it('should display help information when invoked with no switches', function (done) {
        exec('node parker.js', function (noSwitchErr, noSwitchStdout, noSwitchStderr) {
            exec('node parker.js --help', function (helpErr, helpStdout, helpStderr) {
                expect(noSwitchStdout).to.equal(helpStdout);
                done();
            });
        });
    });

    it('should display warnings only when invoked with a --format="warnings" switch', function (done) {
        exec('node parker.js test/fixtures/specificity-warning.css --format="warnings"', function (err, stdout, stderr) {
            expect(stdout).to.contain('Failure: Top Selector Specificity: 900');
            expect(stdout).to.contain('Failure: Specificity Per Selector: 900');
            expect(stdout).to.contain('Failure: Top Selector Specificity: 900');
            done();
        });
    });

    it(
        'should not report warnings for metrics with no configured warning'
        + ' figure when invoked with a --format="warnings" switch',
        function (done) {
            exec('node parker.js test/fixtures/specificity-warning.css --format="warnings"', function (err, stdout, stderr) {
                expect(stdout).to.not.contain('Failure: Media Queries:');
                done();
            });
        }
    );

    it('should reduce the threashold at which warnings are reported when invoked with a --warning-figures="strict" switch', function (done) {
        exec('node parker.js test/fixtures/one-id-selector.css --format="warnings"', function (defaultErr, defaultStdout, defaultStderr) {
            exec('node parker.js test/fixtures/one-id-selector.css --format="warnings" --warning-figures="strict"', function (strictErr, strictStdout, strictStderr) {
                expect(defaultStdout).to.not.contain('Failure: Top Selector Specificity');
                expect(strictStdout).to.contain('Failure: Top Selector Specificity');
                done();
            });
        });
    });

    it('should surpress all colour coding when invoked with a --surpress-colours switch', function (done) {
        exec('node parker.js test/fixtures/specificity-warning.css --surpress-colours', function (err, stdout, stderr) {
            expect(stdout).to.not.contain('[31m');
            done();
        });
    });

    it('should surpress all colour coding when invoked with a --surpress-colours switch and a --format="warnings" switch', function (done) {
        exec('node parker.js test/fixtures/specificity-warning.css --surpress-colours --format="warnings"', function (err, stdout, stderr) {
            expect(stdout).to.not.contain('[31m');
            done();
        });
    });

    it('should exit with code 1 when a failure is reported', function (done) {
        exec('node parker.js test/fixtures/specificity-warning.css --format="warnings"', function (err, stdout, stderr) {
            expect(err.code).to.be.above(0);
            done();
        });
    });
});
