const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1xoanv',
    "retries": {
      // Configure retry attempts for `cypress run`
      // Default is 0
      "runMode": 2,
      // Configure retry attempts for `cypress open`
      // Default is 0
      "openMode": 2
    },
    defaultCommandTimeout:5000,
    
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});
