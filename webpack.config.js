'use strict';

const path = require('path');

module.exports = {
  entry: {
    background: ['./src/background.js'],
    'content-script': ['./src/content-script.js'],
    injected: ['./src/injected.js']
  },
  output: {
    filename: '[name].js',
    path: './app/scripts'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015',
      exclude: /node_modules/
    }]
  },
  resolve: {
    alias: {
      'ac-util': path.join(__dirname, 'src', 'util')
    }
  },
  externals: {
    chrome: 'chrome'
  }
};
