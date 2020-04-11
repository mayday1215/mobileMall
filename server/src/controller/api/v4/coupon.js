const Base = require('./base.js')
// 14
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '优惠券'
    ctx.modelName = 'coupon'
  }

}