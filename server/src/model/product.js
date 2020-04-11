const Base = require('./base')

module.exports = class extends Base {
	async pagination(params) {
		let {
			page = 1,
				size = 10,
				category_id,
				key,
				hPrice,
				lPrice,
				by = 'create_time',
				order = 'desc'
		} = params
		let whereParams = {
			delete_time: null
		}
		if (think.has(key)) {
			whereParams.name = ['like', `%${key}%`]
		}
		let paginationData = await this.where(whereParams).order(`${by} ${order}`).page(page, size).countSelect()
		if (think.isEmpty(paginationData)) {
			return {}
		} else {
			return paginationData
		}
	}

	async getByProductId(id) {

		let product = await this.where({
			id
		}).find()
		if (think.isEmpty(product)) {
			return {}
		} else {
			product.likes = await this.getLikeCountByProductId(id)
			product.properties = await this.getPropertiesByProductId(id)
			product.comments = await this.getCommentsByProductId(id)
			if (think.has(product.category_id)) {
				product.category = await think.model('category').getByCategoryId(product.category_id)
			}
			if (think.has(product.img_ids)) {
				product.imgList = await think.model('img').getByImgIds(product.img_ids)
			}
			if (think.has(product.detail_img_ids)) {
				product.detailImgList = await think.model('img').getByImgIds(product.detail_img_ids)
			}
			return product
		}
	}

	async getLikeCountByProductId(id) {
		let likes = await think.model('product_like').where({
			product_id: id
		}).count()
		if (think.has(likes)) {
			return likes
		} else {
			return 0
		}
	}

	async getPropertiesByProductId(id) {
		let properties = await think.model('product_property').where({
			product_id: id,
			delete_time: null
		}).select()
		if (think.has(properties)) {
			return properties
		} else {
			return []
		}
	}

	async getCommentsByProductId(id) {
		let comments = await think.model('product_rate').join({
			table: 'user',
			join: 'inner',
			on: ['user_id', 'id']
		}).field(
			`product_rate.id, product_rate.rate, product_rate.comment, product_rate.reply, product_rate.product_id, product_rate.user_id, product_rate.create_time, product_rate.update_time, product_rate.delete_time, user.nickname, user.name`
		).where(`product_rate.product_id = ${id} and product_rate.delete_time is null`).select()
		if (think.has(comments)) {
			return comments
		} else {
			return []
		}
	}

	async save(product) {
		product.create_time = Date.now()
		let productId = await this.add(product)
		if (think.has(productId)) {
		  if (Array.isArray(product.properties) && product.properties.length > 0) {
		    let propertyIds = body.properties.map(property => property.id)
		    await think.model('product_property').updateByPropertyIds(propertyIds, {
		      product_id: productId
		    })
		  }
		  product.id = productId
		  return product
		} else {
		  return false
		}
	}

	async updateByProductId() {

	}

	async deleteByProductId() {

	}


}
