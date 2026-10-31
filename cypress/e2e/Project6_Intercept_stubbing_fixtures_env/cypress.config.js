const { defineConfig } = require("cypress");
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = defineConfig({
  projectId: '3ykw63',
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (_browser, launchOptions) => {
        prepareAudit(launchOptions);
        return launchOptions;
      });
      on('task', { lighthouse: lighthouse(), pa11y: pa11y() });
      return config;
    },
  },
});
