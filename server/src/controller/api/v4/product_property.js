const Base = require('./base.js')
// 9
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '商品参数'
    ctx.modelName = 'product_property'
  }
}