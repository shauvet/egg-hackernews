'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529244024422_8455';

  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.tpl',
    mapping: {
      '.tpl': 'nunjucks'
      // '.xtpl': 'xtpl'
    }
  };

  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // config.xtpl = {};

  // add your config here
  config.middleware = [];

  return config;
};
