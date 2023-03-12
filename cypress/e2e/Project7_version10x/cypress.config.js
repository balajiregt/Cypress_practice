const { defineConfig } = require("cypress");
const addContext=require('mochawesome/addContext')

module.exports = defineConfig({
 
  includeShadowDom: true,
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'e2e',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true
  },
  retries: {
    runMode: 1,
    openMode: 1,
    },
  viewportHeight: 800,
  viewportWidth: 1000,
   e2e: {
    experimentalSessionAndOrigin:false,
       setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on)
      },
   }
});
