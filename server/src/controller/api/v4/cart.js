const Base = require('./base.js')
// 11
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '购物车'
    ctx.modelName = 'cart'
  }
  async allAction() {
    let ctx = this.ctx
    if(think.isEmpty(ctx.user)){
      return await ctx.checkAuth()
    }
    let cart = await ctx.model(ctx.modelName).allByUserId(ctx.user.id)
    if(think.isEmpty(cart)){
      ctx.f('all')
    }else{
      ctx.success(cart)
    }

  }

  async updateAction() {
    let ctx = this.ctx
    let body = this.post()
    if(think.isEmpty(ctx.user)){
      await ctx.checkAuth()
    }
    let keyParams = { product_id: body.product_id, user_id: ctx.user.id }
    let rs = await ctx.model(ctx.modelName).where(keyParams).find()

    if (think.has(rs)) {
      if(think.isEmpty(body.count) && body.checked != 0 && body.checked != 1){
        body.count = ++rs.count
      }

      // 更新
      rs = await ctx.model(ctx.modelName).where(keyParams).update({count:body.count, checked:body.checked, update_time:Date.now()})
      if (think.has(rs)) {
        let cart = await ctx.model(ctx.modelName).allByUserId(ctx.user.id)
        ctx.success(cart)
      } else {
        ctx.fail(901102, '更新购物车失败')
      }
    } else {
      body.count = 1
      // 插入
      body.create_time = Date.now()
      body.user_id = ctx.user.id
      rs = await ctx.model(ctx.modelName).add(body)
      if (think.has(rs)) {
        body.id = rs
        let cart = await ctx.model(ctx.modelName).allByUserId(ctx.user.id)
        ctx.success(cart)
      } else {
        ctx.fail(901101, '商品添加到购物车失败')
      }
    }

  }

  async cacheUpdateAction() {
    let ctx = this.ctx
    let body = this.post()
    if(think.isEmpty(ctx.user)){
      await ctx.checkAuth()
    }
    let cart = body.cart
    let isSuccess = true
    for(let i = 0; i < cart.length; i++){
      let item = cart[i]
      item.product_id = parseInt(item.product_id)
      let keyParams = { product_id: item.product_id, user_id:ctx.user.id }
      let rs = await ctx.model(ctx.modelName).where(keyParams).find()
      if (think.has(rs)) {
        // 更新
        rs = await ctx.model(ctx.modelName).where(keyParams).update({count:item.count + rs.count, checked:item.checked, update_time:Date.now()})
        if (think.has(rs)) {
          ctx.success(body)
        } else {
          isSuccess = false
        }
      } else {
        // 插入
        item.create_time = Date.now()
        item.user_id = ctx.user.id
        rs = await ctx.model(ctx.modelName).add(item)
        if (think.has(rs)) {
          body.id = rs
          ctx.success(body)
        } else {
          isSuccess = false
        }
      }
    }
    if(isSuccess){
      let cart = await ctx.model(ctx.modelName).allByUserId(ctx.user.id)
      ctx.success(cart)
    }else{
      ctx.fail(901101, '商品添加到购物车失败')
    }
    
  }

  async deleteAction() {
    let ctx = this.ctx
    let {product_id} = this.get()
    if(think.isEmpty(ctx.user)){
      await ctx.checkAuth()
    }
    let rs = await ctx.model(ctx.modelName).where({product_id, user_id:ctx.user.id}).delete()
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('delete', ctx.moduleName)
    }
  }
}