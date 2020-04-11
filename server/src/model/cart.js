const Base = require('./base')

module.exports = class extends Base {
  async allByUserId(user_id){
    let cart = await this.join({
      table: 'product',
      join: 'inner',
      on: ['product_id', 'id']
    }).field(`cart.product_id, cart.user_id, cart.count, cart.checked, product.name, product.price, product.cover, product.delete_time, product.onsale`).where(`cart.user_id = ${user_id}`).select()
    if(think.has(cart)){
      return cart
    }else{
      return []
    }
  }
}
