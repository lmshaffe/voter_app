const path = require('path');
const { Logger, Config, ExpressServer, RouteLoader, Notifier, HealthManager } = require('microservice_core');

const appRoutes = require.resolve('../config/core/app_routes.json');
const viewPath = path.join(__dirname, '../views');

const {SlackApi} = require('rest_api');

let mongoose = require('mongoose');

class Server {

  async start(options = {}) {
    try {
      Config.load({ appRoutes, viewPath });
      Notifier.inject(SlackApi.create());
      await Notifier.notify('Starting application.');
      ExpressServer.start(options);
      this.app = ExpressServer.app;
      this.router = ExpressServer.router;
      RouteLoader.load(this);
      await this.initMongo();
      await Notifier.notify('Application started.');
    } catch(err) {
      Logger.error(err);
      throw err;
    }
  }

  //TODO: Extract DB tasks into separate module
  async initMongo() {
    return new Promise(async (resolve, reject) => {
      try {
        HealthManager.addHealthCheckHook(this.mongoHealthHook.bind(this), 'mongo');
        Logger.trace('Server : initMongo');
        this.app.locals.db = await mongoose.createConnection(Config.env.MONGO_URI, {promiseLibrary: global.Promise});
        this.app.locals.models = {
          Voter: require('../db/models/Voter'),
        };
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  }

  mongoHealthHook() {
    return new Promise((resolve) => {
      resolve({
        readyState: this.app.locals.db.readyState,
        isConnected: (this.app.locals.db.readyState === 1)
      });
    });
  }
}

class ServerManager {
  static getInstance() {
    if (!ServerManager.instance) ServerManager.instance = new Server();
    return ServerManager.instance;
  }
}

module.exports = ServerManager;
