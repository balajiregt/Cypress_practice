const { defineConfig } = require("cypress");
const addContext=require('mochawesome/addContext')

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'directshift-e2e-sampl',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true,
  },
   e2e: {
      setupNodeEvents(on, config) {
       require('cypress-mochawesome-reporter/plugin')(on);
       //require('cypress-xpath');
     },
   
   },
});
