import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: 'html',

  timeout: 60000,         
  globalTimeout: 300000,

   use: {
    actionTimeout: 30000,  
    navigationTimeout: 30000, 
  },

  projects: [
    {
      name: 'Windows-Chrome',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright-101 Build',
              name: 'TestMu AI Scenarios - Chrome',
              user: 'navanithabtech',      
              accessKey: 'LT_GeP4drwArTm3dInnij3REaMVDHobnwgih4jlm5JcLCwLDX3', 
              video: true,
              screenshot: 'on',
              network: true,
              console: true,
              idleTimeout: 60, 
              sessionTimeout: 300,
            },
          }))}`,
        },
      },
    },
    {
      name: 'macOS-Firefox',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'pw-firefox',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'MacOS Catalina',
              build: 'Playwright-101 Build',
              name: 'TestMu AI Scenarios - Firefox',
              user: 'navanithabtech',      
              accessKey: 'LT_GeP4drwArTm3dInnij3REaMVDHobnwgih4jlm5JcLCwLDX3', 
              video: true,
              screenshot: 'on',
              network: true,
              console: true,
            },
          }))}`,
        },
      },
    },
  ],
});