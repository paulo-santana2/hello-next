const waitOn = require('wait-on');
const child_process = require('child_process');
const environment = process.env.NODE_ENV || 'test';

function createServer() {
  let localServerProcess;

  function start() {
    const testUrl = `${getUrl()}/api/randomQuote`;

    if (environment === 'test') {
      localServerProcess = startLocalServer();
    }

    return waitOn({
      resources: [testUrl],
    });
  }

  function startLocalServer() {
    if(process.platform === 'win32') {
      return child_process.spawn('npm.cmd', ['run', 'dev']);
    } else {
      return child_process.spawn('node', ['node_modules/.bin/next']);
    }
  }

  function stop() {
    if (localServerProcess) {
      if (process.platform === 'win32') {
        child_process.execSync(`taskkill /F /T /PID ${localServerProcess.pid}`);
      } else {
        child_process.execSync(`kill -9 ${localServerProcess.pid}`);
      }
    }
  }

  function getUrl() {
    if (process.env.NODE_ENV === 'ci') {
      return process.env.PREVIEW_URL;
    }

    return 'http://localhost:3000';
  }

  return { start, stop, getUrl };
}

module.exports = createServer;
