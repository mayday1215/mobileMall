const Base = require('./base')
let whiteList = ['create']

module.exports = class extends Base {
  async __before() {
    let { ctx } = this
    let token = ctx.headers.authorization
    ctx.token = token
    return await ctx.checkAuth()
  }
  async paginationAction() {
    return false
  }
  // async allAction() {
  //   let ctx = this.ctx
  // }
  async updateAction() {
    this.allowMethods = 'post'
    let ctx = this.ctx
    let {
      product_id,
      count,
      checked
    } = this.post()

    if(think.isEmpty(product_id)){
      return ctx.f('required', 'product_id')
    }else if(!think.isParsePositiveInt(product_id)){
      return ctx.f('positiveInt', 'product_id')
    }
    if(think.has(count) && !think.isParsePositiveInt(count)){
      return ctx.f('positiveInt', 'count')
    }
    if(!think.isUndefined(checked) && !think.isBoolInt(checked)){
      return ctx.f('boolInt', 'checked')
    }
  }
  async indexAction() {
    return false
  }
  async createAction() {
    return false
  }
  async cacheUpdateAction() {
    this.allowMethods = 'post'
    let ctx = this.ctx
    let body = this.post()
    let cart = body.cart
    if(think.isEmpty(cart)){
      return ctx.f('required', 'cart')
    }
    if(Array.isArray(cart)){
      for(let i = 0; i < cart.length; i++){
        if(think.isEmpty(cart[i].product_id)){
          return ctx.f('required', 'product_id')
        }
        if(think.isEmpty(cart[i].count)){
          return ctx.f('required', 'count')
        }
        if(!think.isUndefined(cart[i].checked) && !think.isBoolInt(cart[i].checked)){
          return ctx.f('boolInt', 'checked')
        }
      }
    }else{
      return ctx.f('array', 'cart')
    }
  }

  async deleteAction() {
    this.allowMethods = 'get'
    let ctx = this.ctx
    let {
      product_id
    } = this.get()
    if(think.isEmpty(product_id)){
      return ctx.f('required', 'product_id')
    }
  }

 }