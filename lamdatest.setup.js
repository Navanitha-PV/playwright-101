const { chromium } = require('playwright');

exports.connect = async (capabilities) => {
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  });
  return browser;
};