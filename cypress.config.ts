// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'toy1fa',
  fixturesFolder: "./cypress/fixtures",
  supportFolder: "./cypress/support",
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
