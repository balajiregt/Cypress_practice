const { defineConfig } = require("cypress");
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport); // raw lighthouse reports
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport); // raw pa11y reports
    }),
  });
};
module.exports = defineConfig({
  projectId: '3ykw63',
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl:'http://localhost:3000/'
      // implement node event listeners here
     
    },
  },
});
