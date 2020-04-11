const Base = require('./base.js')
// 16
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
    ctx.moduleName = '秒杀'
    ctx.modelName = 'flash_sale'
  }

}