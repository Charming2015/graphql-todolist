require('babel-register')({
    presets: [ 'env' ]
})
require('babel-polyfill')
require('./server.js')
// babel-preset-env babel-polyfill babel-register