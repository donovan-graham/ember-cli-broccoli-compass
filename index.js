/* global require, module */
'use strict';
var path  = require('path');
var mergeTrees  = require('broccoli-merge-trees');
var compileCompass = require('broccoli-compass');

function CompassCompilerPlugin(options, appName) {
  this.name    = 'ember-cli-broccoli-compass';
  this.appName = appName;
  this.options = options || {};
  this.ext     = 'scss';
}

CompassCompilerPlugin.prototype.toTree = function(tree, inputPath, outputPath) {
  // broccoli-compass doesn't like leading slashes
  if (inputPath[0] === '/') { inputPath = inputPath.slice(1); }

  var options        = this.options;
  var mainFile       = options.mainFile       || (this.appName + '.' + this.ext);
  var cssDir         = options.cssDir         || outputPath;
  var configFile     = options.configFile     || "config.rb";

  var compassOptions = {
    sassDir: undefined,  /* overide and ignore the default brocolli-compass behaviour */
    relativeAssets: undefined,   /* overide and ignore the default brocolli-compass behaviour */
    config: '"' + path.join("../../", configFile) + '"',   // we need to make this relative to the ./tmp/trees/ directory
    cssDir: cssDir,     // output dir
  };

  tree = mergeTrees([tree, 'public'], {
    description: 'TreeMerger (stylesAndVendorAndPublic)'
  });

  return compileCompass(tree, inputPath + '/' + mainFile, compassOptions);
};

function EmberCliBroccoliCompass(project) {
  this.project = project;
  this.name    = 'Ember CLI Broccoli Compass';
}
EmberCliBroccoliCompass.prototype.treeFor = function treeFor() {

};

EmberCliBroccoliCompass.prototype.included = function included(app) {
  this.app     = app;
  var registry = this.app.registry;
  var plugin   = new CompassCompilerPlugin(this.app.options.compassOptions, this.app.name);
  registry.add('css', plugin);
};

module.exports = EmberCliBroccoliCompass;
