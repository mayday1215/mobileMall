const Base = require('./base')

module.exports = class extends Base {
	async updateByPropertyIds(propertyIds, property) {
		let isSuccess = await ctx.model('product_property').where({
			id: ['in', propertyIds]
		}).update(property)
		if(isSuccess){
			return true
		}else{
			return false
		}
	}
}
