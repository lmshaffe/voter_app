'use strict';
const { Logger } = require('microservice_core');
const { ApiResponseHandler } = require('rest_api');

class Test {
  constructor(server) {
    Logger.trace('Test : constructor');
    this.server = server;
  }

  register(router) {
    Logger.trace('Test : register');
    router.get('/test', this.testRoute.bind(this));
    return router;
  }

  async testRoute(req, res) {
    Logger.trace('Test : testRoute');
    try {
      let loTiles = {data: 'test data'};
      ApiResponseHandler.respondWith200(res, loTiles);
    } catch(e) {
      ApiResponseHandler.respondWith500(res, e);
    }
  }

}

module.exports = Test;
