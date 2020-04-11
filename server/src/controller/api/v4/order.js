const Base = require('./base.js')
// 12
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '订单'
    ctx.modelName = 'order'
  }

  async paginationAction() {
    let ctx = this.ctx
    let { whereParams, orderParams, pageParams } = ctx
    whereParams.user_id = ctx.user.id
    let pagination = await ctx.model(ctx.modelName).where(whereParams).order(`${orderParams.by} ${orderParams.order}`).page(pageParams.page, pageParams.size).countSelect()
    if (think.has(pagination)) {
      let list = pagination.data
      for (let i = 0; i < list.length; i++) {
        list[i].orderProducts = await ctx.model('order_product').join({
          table: 'product',
          join: 'inner',
          on: ['product_id', 'id']
        }).field(`order_product.count, product.id, product.name, product.price, product.cover, product.create_time, product.update_time, product.delete_time`).where(`order_id=${list[i].id}`).select()
      }
      ctx.success(pagination)
    } else {
      ctx.f('all')
    }
  }

  async indexAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let order = await ctx.model(ctx.modelName).where(`id=${id}`).find()
    if (think.has(order)) {
      let orderProducts = await ctx.model('order_product').join({
        table: 'product',
        join: 'inner',
        on: ['product_id', 'id']
      }).field(`order_product.count, product.name, product.price, product.cover, product.create_time, product.update_time, product.delete_time`).where(`order_id=${id}`).select()
      if (think.has(orderProducts)) {
        order.orderProducts = orderProducts
      } else {
        return ctx.f('index', ctx.moduleName)
      }
      let userAddress = await ctx.model('user_address').where({ id: order.user_address_id }).find()
      if (think.has(userAddress)) {
        order.userAddress = userAddress
      } else {
        return ctx.f('index', ctx.moduleName)
      }
      ctx.success(order)
    } else {
      return ctx.f('index', ctx.moduleName)
    }
  }

  async createAction() {
    let ctx = this.ctx
    let body = this.post()
    body.create_time = Date.now()
    if (think.isEmpty(ctx.user)) {
      await ctx.checkAuth()
    } else {
      body.user_id = ctx.user.id
    }
    let t = body.orderProductList.reduce((prev, curr, index) => {
      return prev += curr.price * curr.count
    }, 0)
    if (t > 0) {
      body.total_cost = t
    }
    let orderId = await ctx.model(ctx.modelName).add(body)
    body.orderProductList.forEach(async product => {
      t += product.price + product.count
      let order_product_id = await ctx.model('order_product').add({ order_id: orderId, product_id: product.product_id, count: product.count, create_time: Date.now() })
      if (think.isEmpty(order_product_id)) {
        ctx.f('create', ctx.moduleName)
      }
      let rs = await ctx.model('cart').where({ product_id:product.product_id, user_id: ctx.user.id }).delete()
      if (think.isEmpty(rs)) {
        ctx.f('delete', 'cart')
      }
    })
    if (think.has(orderId)) {
      body.id = orderId
      ctx.success(body)
    } else {
      ctx.f('create', ctx.moduleName)
    }
  }

  async payAction() {
    let ctx = this.ctx
    let {
      order_id
    } = this.get()
    let body = this.post()
    let user = await ctx.model('user').where({ id: ctx.user.id, pay_password: body.pay_password }).find()
    if (think.has(user)) {
      let rs = await ctx.model(ctx.modelName).where({ id: order_id }).update({ order_status: 1, pay_time: Date.now() })
      if (think.has(rs)) {
        let orderProducts = await ctx.model('order_product').where({order_id:order_id}).select()
        for(let i = 0; i < orderProducts.length; i++){
          let product = await ctx.model('product').where({id:orderProducts[i].product_id}).find()
          await ctx.model('product').where({id:orderProducts[i].product_id}).update({sales:product.sales + 1})
        }
        ctx.success('支付成功')
      } else {
        ctx.fail(901202, `支付失败`)
      }
    } else {
      ctx.fail(901201, `支付密码错误`)
    }
  }

  async deliverAction() {
    let ctx = this.ctx
    let {
      order_id
    } = this.get()
    let body = this.post()
    let rs = await ctx.model(ctx.modelName).where({ id: order_id }).update({ order_status: 2, deliver_time: Date.now() })
    if (think.has(rs)) {
      ctx.success('发货成功')
    } else {
      ctx.fail(901203, `发货失败`)
    }
  }

  async receiptAction() {
    let ctx = this.ctx
    let {
      order_id
    } = this.get()
    let body = this.post()
    let rs = await ctx.model(ctx.modelName).where({ id: order_id }).update({ order_status: 3, receipt_time: Date.now() })
    if (think.has(rs)) {
      ctx.success('确认收货成功')
    } else {
      ctx.fail(901204, `确认收货失败`)
    }
  }

  async rateAction() {
    let ctx = this.ctx
    let {
      order_id,
      comment,
      rate
    } = this.get()
    let body = this.post()
    let rs = await ctx.model(ctx.modelName).where({ id: order_id }).update({ order_status: 4, comment, rate, rate_time: Date.now() })
    if (think.has(rs)) {
      ctx.success('评价成功')
    } else {
      ctx.fail(901205, `评价失败`)
    }
  }

}