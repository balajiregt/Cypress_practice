const state = require("../state");
const {
  computeCategories,
  computeAudits,
  compareWithThresholds,
} = require("./helpers");

const lighthouse = (callback) => async ({ url, thresholds, opts = {}, config }) => {
  if (state.port) {
    const { default: lighthouseLib } = await import("lighthouse");
    opts = { ...opts, port: state.port };

    if (!opts.onlyCategories) {
      opts.onlyCategories = Object.keys(thresholds);
    }

    if (opts.disableStorageReset === undefined) {
      opts.disableStorageReset = true;
    }

    return lighthouseLib(url, opts, config).then((results) => {
      if (callback) {
        callback(results);
      }

      const computedAudits = computeAudits(results.lhr.audits);
      const computedCategories = computeCategories(results.lhr.categories);

      const allMetrics = { ...computedAudits, ...computedCategories };

      return compareWithThresholds(allMetrics, thresholds);
    });
  }

  throw new Error("Lighthouse requires prepareAudit and a supported browser debugging port");
};

module.exports = { lighthouse };
