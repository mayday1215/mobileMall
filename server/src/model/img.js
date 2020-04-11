const Base = require('./base')

module.exports = class extends Base {

	async getByImgId(id) {
		let img = await this.where({
			id
		}).find()
		if (think.has(img)) {
			return img
		}else{
			return {}
		}
	}
	
	async getByImgIds(ids) {
		let imgList = await this.where({ id: ['in', ids] }).select()
		if (think.has(imgList)) {
			return imgList
		}else{
			return []
		}
	}

}
