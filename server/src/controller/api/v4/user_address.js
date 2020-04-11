const Base = require('./base.js')
// 17
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '用户地址'
    ctx.modelName = 'user_address'
  }

  async updateAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let body = this.post()
    body.update_time = Date.now()
    body.user_id = ctx.user.id
    let rs = await ctx.model(ctx.modelName).where(`id=${id}`).update(body)
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }

}