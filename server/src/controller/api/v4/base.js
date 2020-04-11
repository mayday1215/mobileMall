module.exports = class extends think.Controller {
  async paginationAction() {
    let ctx = this.ctx
    let { whereParams, orderParams, pageParams } = ctx
    let pagination = await ctx.model(ctx.modelName).where(whereParams).order(`${orderParams.by} ${orderParams.order}`).page(pageParams.page, pageParams.size).countSelect()
    if (think.has(pagination)) {
      ctx.success(pagination)
    } else {
      ctx.f('all')
    }
  }
  
  async allAction() {
    let ctx = this.ctx
    let params = this.get()
    params.delete_time = null
    let rs = await ctx.model(ctx.modelName).where(params).order(`create_time desc`).select()
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('all')
    }
  }
  async indexAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let rs = await ctx.model(ctx.modelName).where(`id=${id}`).find()
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('index', ctx.moduleName)
    }
  }
  async createAction() {
    let ctx = this.ctx
    let body = this.post()
    body.create_time = Date.now()
    if(think.isEmpty(ctx.user)){
      await ctx.checkAuth()
    }else{
      body.user_id = ctx.user.id
    }
    let rs = await ctx.model(ctx.modelName).add(body)
    if (rs >= 0) {
      body.id = rs
      ctx.success(body)
    } else {
      ctx.f('create', ctx.moduleName)
    }
  }
  async updateAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let body = this.post()
    body.update_time = Date.now()
    console.log(body)
    let rs = await ctx.model(ctx.modelName).where(`id=${id}`).update(body)
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }
  async deleteAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let rs = await ctx.model(ctx.modelName).where(`id=${id}`).update({
      delete_time: Date.now()
    })
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('delete', ctx.moduleName)
    }
  }

}
