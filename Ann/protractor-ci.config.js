const config = require('./protractor.conf').config;

config.capabilities = {
    browserName : 'chrome',
    chromeOptions : {
        args : ['--hadless', '--no-sandbox']
    }
};

exports.config = config;