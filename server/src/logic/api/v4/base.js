const jwt = require('jsonwebtoken')
const whiteList = ['signin', 'signup', 'signout', 'find', 'all', 'pagination', 'index']

module.exports = class extends think.Logic {
  async __before() {
    let { ctx } = this
    let token = ctx.headers.authorization
    ctx.token = token
    if (whiteList.indexOf(ctx.action) === -1) {
      return await ctx.checkAuth()
    }
  }
  async paginationAction() {
    this.allowMethods = 'get'
    let ctx = this.ctx
    let {
      page = 1,
      size,
      key,
      by = 'create_time',
      order = 'desc'
    } = this.get()

    ctx.pageParams = {
      page,
      size
    }
    ctx.orderParams = {}
    ctx.orderParams.by = think.isEmpty(by) ? 'create_time' : by
    ctx.orderParams.order = think.isEmpty(order) ? 'desc' : order
    ctx.whereParams = {
      delete_time: null
    }

    if (think.has(key)) {
      ctx.whereParams.name = ['like', `%${key}%`]
    }

  }
  async indexAction() {
    this.allowMethods = 'get'
    let ctx = this.ctx
    let { id } = this.get()
    if (think.isEmpty(id)) {
      return ctx.f('required', 'id')
    } else if (think.isParsePositiveInt(id)) {
      ctx.whereParams = { id }
    } else {
      return ctx.f('positiveInt', 'id')
    }
  }
}