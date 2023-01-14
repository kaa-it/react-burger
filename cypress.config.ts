import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1400,
  viewportHeight: 1024,

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
