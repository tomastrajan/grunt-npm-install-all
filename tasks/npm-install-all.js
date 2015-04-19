/*
 * grunt-npm-install-all
 * https://github.com/tomastrajan/grunt-npm-install-all
 *
 * Copyright (c) 2015 Tomas Trajan
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('npm-install-all', 'Run npm install in all matching directories with package.json file (exclude package.json files in already installed node_modules directories)', function () {

        var exec = require('child_process').exec,
            done = this.async(),

            paths = [],
            pathsError = [],
            pathsSuccess = [],
            doneCounter = 0,

            options = this.options({
                includeNodeModules: false
            });

        this.files.forEach(function (file) {
            file.src.forEach(function (path) {
                if (options.includeNodeModules || path.indexOf('node_modules') === -1) {
                    paths.push(path.replace('package.json', ''));
                }
            });
        });

        paths.forEach(function (path) {
            exec('npm install', {cwd: path}, function (err, stdout, stderr) {
                doneCounter++;
                if (stderr || err) {
                    grunt.log.error(stderr || err);
                    pathsError.push(path);
                } else {
                    pathsSuccess.push(path);
                }
                if (stdout) {
                    console.error(stdout);
                }
                if (doneCounter === paths.length) {
                    if (pathsSuccess.length) {
                        grunt.verbose.writeln('\n\nPaths with "npm install" success\n'['green'].bold);
                        pathsSuccess.forEach(function (path) {
                            grunt.verbose.writeln('  ' + path['green'].bold);
                        });
                    }
                    if (pathsError.length) {
                        grunt.log.writeln('\n\nPaths with "npm install" errors\n'['red'].bold);
                        pathsError.forEach(function (path) {
                            grunt.log.writeln('  ' + path['red'].bold);
                        });
                    }
                    done();
                }
            });
        });

        if (!paths.length) {
            done();
        }

    });

};
