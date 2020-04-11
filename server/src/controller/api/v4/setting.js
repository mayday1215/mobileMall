const Base = require('./base.js')
// 15
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '商城设置'
    ctx.modelName = 'setting'
  }
  async indexAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let rs = await ctx.model(ctx.modelName).limit(1).select()
    if (think.has(rs)) {
      ctx.success(rs[0])
    } else {
      ctx.f('index', ctx.moduleName)
    }
  }
  async updateAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let body = this.post()
    body.update_time = Date.now()
    let rs = await ctx.model(ctx.modelName).where(`id>0`).update(body)
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }
}