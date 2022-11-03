const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3ykw63',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
