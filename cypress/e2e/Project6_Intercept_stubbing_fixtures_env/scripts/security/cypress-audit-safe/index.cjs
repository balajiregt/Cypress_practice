const state = require("./src/state");

const { pa11y } = require("./src/a11y/task");
const { lighthouse } = require("./src/performances/task");

const prepareAudit = (launchOptions) => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.includes("--remote-debugging-port=")
  );

  if (remoteDebugging) {
    const value = Number(remoteDebugging.split("=")[1]);
    if (!Number.isInteger(value) || value < 1 || value > 65535) throw new Error("Invalid browser debugging port");
    state.port = value;
  }
};

module.exports = { lighthouse, pa11y, prepareAudit };
