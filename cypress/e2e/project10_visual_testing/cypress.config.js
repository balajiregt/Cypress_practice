const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

module.exports = defineConfig({
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
  video: false,
  capture: 'fullPage',
  e2e: {
    baseUrl: 'https://demo.applitools.com',
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
  },
  env: {
    "ALWAYS_GENERATE_DIFF": true,
    "ALLOW_VISUAL_REGRESSION_TO_FAIL": false
  }
});
