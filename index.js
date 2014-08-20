/* global require, module */
'use strict';
// var path  = require('path');  
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

  var outputStyle    = options.outputStyle    || 'compressed'; // or expanded
  var sassDir        = options.sassDir        || inputPath;
  var imagesDir      = options.imagesDir      || 'images';
  var fontsDir       = options.fontsDir       || 'fonts';
  var compassCommand = options.compassCommand || 'compass';

  // var compassOptions = {
  //   outputStyle: outputStyle,
  //   require: options.require,
  //   importPath: options.importPath,
  //   sassDir: sassDir,
  //   imagesDir: imagesDir,
  //   fontsDir: fontsDir,
  //   cssDir: cssDir,
  //   compassCommand: compassCommand
  // };


  var compassOptions = {
    sassDir: undefined,
    relativeAssets: undefined,
    require: options.require,
    config: '"../../config.rb"', 
    cssDir: cssDir,
    compassCommand: compassCommand
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
