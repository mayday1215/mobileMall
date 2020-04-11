const Base = require('./base.js')
// 10
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '商品评论'
    ctx.modelName = 'product_rate'
  }
}