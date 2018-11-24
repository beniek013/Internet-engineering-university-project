// Konfiguracja aplikacji

const path = require('path')
const merge = require('lodash/merge')  // biblioteka Lodash: https://lodash.com/

const serveruri='ds033400.mlab.com:33400'
const database='ii_cinema'
const user='ii_cinema_admin'
const password='admin2018'

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 3000,
        ip: '127.0.0.1',
        apiRoot: '/api',
        mongo: {
            options : {
                useCreateIndex: true,        // DeprecationWarning: collection.ensureIndex is deprecated.
                useNewUrlParser: true           // DeprecationWarning: current URL string parser is deprecated
            }
        }
    },
    test: {
        mongo: {
            uri: `mongodb://${user}:${password}@${serveruri}/${database}`,
            options: {
                debug: true
            }
        }
    },
    development: {
        mongo: {
            uri: `mongodb://${user}:${password}@${serveruri}/${database}`,
            options: {
                debug: true
            }
        }
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 8080,
        mongo: {
            uri: '### adres serwera produkcyjnego ###',
        }
    }
}

module.exports = merge(config.all, config[config.all.env])
