const Base = require('./base.js')
// 8
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '商品收藏'
    ctx.modelName = 'product_like'
  }

  async allAction() {
    let ctx = this.ctx
    let rs = await this.model(ctx.modelName).join({
      table: 'product',
      join: 'inner',
      on: ['product_id', 'id']
    }).field(`product.id, product.name, product.price, product.cover`).where({user_id:ctx.user.id}).select()
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('all')
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
    let rs = await ctx.model(ctx.modelName).where(`user_id=${ctx.user.id} and product_id=${body.product_id}`).count()
    if(rs > 0){
      return ctx.fail(90802, '此商品已经被收藏，无法收藏')
    }
    rs = await ctx.model(ctx.modelName).add(body)
    if (rs >= 0) {
      body.id = rs
      // let product = await ctx.model('product').where({id:body.product_id}).find()
      // await ctx.model('product').where({id:body.product_id}).update({likes:product.likes + 1})
      ctx.success(body)
    } else {
      ctx.f('create', ctx.moduleName)
    }
  }
  async deleteAction() {
    let ctx = this.ctx
    let {
      product_id
    } = this.get()
    if(think.isEmpty(ctx.user)){
      await ctx.checkAuth()
    }
    let rs = await ctx.model(ctx.modelName).where(`user_id=${ctx.user.id} and product_id=${product_id}`).count()
    if(rs == 0){
      return ctx.fail(90801, '此商品并没有被收藏，无法取消收藏')
    }
    rs = await ctx.model(ctx.modelName).where(`user_id=${ctx.user.id} and product_id=${product_id}`).delete()
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('delete', ctx.moduleName)
    }
  }
}