const Base = require('./base.js')
// 4
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '分类'
    ctx.modelName = 'category'
  }
  async allAction() {
    let ctx = this.ctx
    let params = this.get()
    params.delete_time = null
    let rs = await ctx.model(ctx.modelName).where(params).order(`create_time desc`).select()
    if (think.has(rs)) {
      let tree = rs.filter(item => item.pid == 0)
      tree.forEach(item => {
        let children = rs.filter(sub => sub.pid == item.id)
        item.children = children.length > 0 ? children : null
      })
      ctx.success(tree)
    } else {
      ctx.f('all')
    }
  }
  async deleteAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let rs = await ctx.model(ctx.modelName).where(`pid = ${id}`).find()
    if (think.has(rs)) {
      return ctx.fail(90401, `此${ctx.moduleName}有子分类，先删除子分类才能删除`)
    }
    rs = await ctx.model(ctx.modelName).where(`id = ${id}`).update({
      delete_time: Date.now()
    })
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('delete', ctx.moduleName)
    }

  }
}