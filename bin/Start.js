const { Logger } = require('microservice_core');
const Server = require('../core/Server');

(async function() {
  try {
    Logger.info('Starting the application.');
    await Server.getInstance().start();
  } catch (err) {
    Logger.info('Application failed to start.');
    Logger.info('Exiting.');
    process.exit(1);
  }
})();
