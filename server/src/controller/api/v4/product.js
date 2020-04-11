const Base = require('./base.js')

// 3
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '商品'
  }

  async paginationAction() {
    let ctx = this.ctx
    let pagination = await this.model('product').pagination(this.get())
    if (think.has(pagination)) {
      ctx.success(pagination)
    } else {
      ctx.f('all')
    }
  }
  
  async indexAction() {
    let ctx = this.ctx
    let { id } = this.get()
    let product = await this.model('product').getByProductId(id)
    if (think.has(product)) {
      ctx.success(product)
    } else {
      ctx.f('index', ctx.moduleName)
    }
  }

  async createAction() {
    let ctx = this.ctx
    let product = await this.save(this.post())
    if (think.has(product)) {
      ctx.success(product)
    } else {
      ctx.f('create', ctx.moduleName)
    }
  }

}