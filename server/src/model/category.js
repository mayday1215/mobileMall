const Base = require('./base')

module.exports = class extends Base {

	async getByCategoryId(id) {
		let category = await this.where({
			id
		}).find()
		if (think.has(category)) {
			return category
		}else{
			return {}
		}
	}

}
