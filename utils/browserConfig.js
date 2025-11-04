const config = require('../config/browser.config.json');

class BrowserConfig {
    static getConfig() {
        return {
            ...config.browserConfig,
            workers: process.env.CI ? config.parallel.workers : 1,
            retries: process.env.CI ? config.parallel.retries : 0
        };
    }

    static getContext(browser) {
        return {
            viewport: config.browserConfig.viewport,
            recordVideo: process.env.CI ? config.browserConfig.recordVideo : undefined
        };
    }
}

module.exports = BrowserConfig;