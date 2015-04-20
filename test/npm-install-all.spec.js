'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['npm-install-all'] = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {

        var installedNodeModulesPaths = grunt.file.expand('test/fixtures/**/node_modules');
        test.equal(installedNodeModulesPaths.length, 4, 'Correct number of installed node_modules folder found');

        installedNodeModulesPaths.forEach(function(path) {
           test.ok(grunt.file.exists(path + '/lodash'), 'Dependency installed');
        });

        test.done();
    }
};
