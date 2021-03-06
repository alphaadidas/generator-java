'use strict';

var path    = require('path')
  , assert  = require('yeoman-generator').assert
  , helpers = require('yeoman-generator').test;

describe('java:class', function () {
  describe('non-namespaced', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/class'))
        .inDir(path.join(__dirname, '../.tmp/class/non-namespaced'))
        .withArguments([
          'Class'
        ])
        .on('end', done);
    });

    it('creates expected files', function () {
      assert.file([
        'src/main/java/Class.java'
      , 'src/test/java/ClassTest.java'
      ]);

      assert.noFileContent([
        ['src/main/java/Class.java', /package ;/]
      , ['src/test/java/ClassTest.java', /package ;/]
      ]);
    });
  });

  describe('namespaced', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/class'))
        .inDir(path.join(__dirname, '../.tmp/class/namespaced'))
        .withArguments([
          'namespace.project.Class'
        ])
        .on('end', done);
    });

    it('creates expected files', function () {
      assert.file([
        'src/main/java/namespace/project/Class.java'
      , 'src/test/java/namespace/project/ClassTest.java'
      ]);

      assert.fileContent([
        ['src/main/java/namespace/project/Class.java', /package namespace.project;/]
      , ['src/test/java/namespace/project/ClassTest.java', /package namespace.project;/]
      ]);
    });
  });
});
