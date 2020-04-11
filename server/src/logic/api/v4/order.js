const Base = require('./base')

module.exports = class extends Base {
  async __before() {
    let { ctx } = this
    let token = ctx.headers.authorization
    ctx.token = token
    return await ctx.checkAuth()
  }
}