const { devices, expect } = require('@playwright/test')

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {

    timeout: 5000,
  },
  
  reporter: 'html',

  use: {

    browserName : 'chromium',
    headless : false,
    // launchOptions: {
    //   slowMo: 2000
    // }
    screenshot : 'on',
    trace: 'on' // 'retain-on-failure' robi SC tylko dla nie udanych testow

  },

};

module.exports = config;
