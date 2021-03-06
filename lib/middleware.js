'use strict';

var express     = require('express');
var swig        = require('swig-templates');
var swigFilters = require('./filters');
var router      = require('./router');

var middleware = function (config) {
  var app = express();

  //Set up swig
  var swigEngine = new swig.Swig();
  app.engine('html', swigEngine.renderFile);
  Object.keys(swigFilters).forEach(function (name) {
    swig.setFilter(name, swigFilters[name]);
  });

  //App configuration
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('view options', { layout: false });

  app.use('/', router(config));

  app.set('read_only',      config.options.readOnly      || false);
  app.set('gridFSEnabled',  config.options.gridFSEnabled || false);

  return app;
};

module.exports = middleware;
