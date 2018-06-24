const Service = require('egg').Service;

/**
 * HackerNews service
 */
class NewsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.ctx.app.config.news;
    this.serverUrl = this.config.serverUrl;
    this.pageSize = this.config.pageSize;
  }

  /**
   * common ajax method
   * @param {String} api 
   * @param {Object} opts 
   * @return {Promise}
   */
  async request(api, opts) {
    const options = Object.assign({
      dataType: 'json',
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`, options);
    return result.data;
  }

  async getTopStories(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || this.pageSize;

    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`
      }
    });

    return Object.keys(result).map(key => result[key]);
  }

//   async list(page = 1) {
//     const { serverUrl, pageSize } = this.config.news;

//     const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
//       data: {
//         orderBy: '"$key"',
//         startAt: `"${pageSize * (page - 1)}"`,
//         endAt: `"${pageSize * page - 1}"`,
//       },
//       dataType: 'json',
//       timeout: 30000,
//     });

//     const newsList = await Promise.all(
//       Object.keys(idList).map(key => {
//         const url = `${serverUrl}/item/${idList[key]}.json`;
//         return this.ctx.curl(url, { dataType: 'json' });
//       })
//     );
//     return newsList.map(res => res.data);
//   }
}

module.exports = NewsService;