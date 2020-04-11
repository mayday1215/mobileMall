const Base = require('./base')

module.exports = class extends Base {
  async infoByUserId(user_id){
    let user = await this.model('user').where({id:user_id}).find()
    user.addressList = await this.model('user_address').where({user_id, delete_time:null}).select()
    user.likeList = await this.model('product_like').join({
      table: 'product',
      join: 'inner',
      on: ['product_id', 'id']
    }).field(`product_like.product_id, product.name, product.price, product.cover`).where({user_id}).select()
    if(think.has(user)){
      return user
    }else{
      return {}
    }
  }
}
