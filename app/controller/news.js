'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx, app } = this;
    const page = ctx.query.page || 1;
    const pageSize = app.config.news.pageSize;
    const idList = await ctx.service.news.getTopStories(page);
    const newsList = await Promise.all(idList.map(id => ctx.service.news.getItem(id)));
    await ctx.render('news/list.tpl', { list: newsList, page, pageSize });
  }
}

module.exports = NewsController;