const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");
const state = require("../state");

const pa11y = (callback) => async ({ url, opts }) => {
  if (!state.port) throw new Error("Pa11y requires prepareAudit and a supported browser debugging port");
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${state.port}`,
  });

  try {
  const results = await pa11yLib(url, { browser, runners: ["axe"], ...opts });

  if (callback) {
    callback(results);
  }

  return results.issues || [];
  } finally { await browser.disconnect(); }
};

module.exports = { pa11y };
