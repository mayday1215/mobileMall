const Base = require('./base.js')
const cityData = require('../../../util/cityData')
const areaData = require('../../../util/areaData')
// 18
module.exports = class extends Base {
  constructor(ctx){
    super(ctx)
  }

  async cityAction(){
    this.ctx.success(cityData)
  }

  async areaAction(){
    this.ctx.success(areaData)
  }

}
