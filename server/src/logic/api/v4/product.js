const Base = require('./base')

module.exports = class extends Base {
  async paginationAction() {
    this.allowMethods = 'get'
    let ctx = this.ctx
    let {
      page = 1,
      size,
      category_id,
      key,
      hPrice,
      lPrice,
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
      delete_time:null
    }
    if(think.has(key)){
      ctx.whereParams.name = ['like', `%${key}%`]
    }
    if(think.has(category_id)){
      if(think.isParsePositiveInt(category_id)){
        ctx.whereParams.category_id = category_id
      }else{
        return ctx.f('positiveInt', 'category_id')
      }
    }
    if(think.has(lPrice) && think.has(hPrice)){
      if(think.isNotParsePositiveInt(lPrice)){
        return ctx.f('positiveInt', 'lPrice')
      }
      if(think.isNotParsePositiveInt(hPrice)){
        return ctx.f('positiveInt', 'lPrice')
      }
      ctx.whereParams.price = ['between', lPrice, hPrice]
    }else if(think.has(lPrice)){
      if(think.isNotParsePositiveInt(lPrice)){
        return ctx.f('positiveInt', 'lPrice')
      }
      ctx.whereParams.price = ['>=', lPrice]
    }else if(think.has(hPrice)){
      if(think.isNotParsePositiveInt(hPrice)){
        return ctx.f('positiveInt', 'hPrice')
      }
      ctx.whereParams.price = ['<=', hPrice]
    }

  }

  
 }