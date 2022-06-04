"use strict";

const bootstrap = require('./bootstrap');
const controllers = require('./controllers');
const routes = require('./routes');

module.exports = () => ({
  bootstrap,
  controllers,
  routes,
});
