const { defineConfig } = require("cypress");

/// <reference types="cypress-xpath" />

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
