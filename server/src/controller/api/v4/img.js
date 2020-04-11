const Base = require('./base.js')
const fs = require('fs')
const path = require('path')
// 5
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '图片'
    ctx.modelName = 'img'
  }

  async uploadAction() {
    let ctx = this.ctx
    let file = this.file('img')
    let type = file.type
    if (type.indexOf('image') === -1) {
      return ctx.fail(90502, '请上传正确的图片格式')
    }
    let fileNameSplit = file.name.split('.')
    let ext = fileNameSplit[fileNameSplit.length - 1]
    let create_time = Date.now()
    let filePath = this.config('uploadPath') + '/' + create_time + '.' + ext
    let realPath = path.join(think.APP_PATH, filePath)
    if (!think.isDirectory(path.dirname(realPath))) {
      think.mkdir(path.dirname(realPath))
    }
    let img = {
      path: filePath,
      type,
      ext,
      create_time
    }
    let rs = await ctx.model(ctx.modelName).add(img)
    if (think.has(rs)) {
      await think.promisify(fs.rename)(file.path, realPath)
      img.id = rs
      return this.success(img)
    } else {
      return this.fail(90501, `上传图片失败`)
    }

  }

  async deleteAction() {
    let ctx = this.ctx
    let {
      id
    } = this.get()
    let img, notExist = false
    let rs = await ctx.model(ctx.modelName).where(`id = ${id}`).find()
    if(think.has(rs)){
      img = rs
    }
    try {
      let filePath = path.join(think.APP_PATH, img.path)
      await think.promisify(fs.unlink)(filePath)
    } catch (error) {
      notExist = true
    }
    if(notExist){
      return ctx.fail(90503, '图片文件不存在')
    }
    rs = await ctx.model(ctx.modelName).where(`id = ${id}`).update({
      delete_time:Date.now()
    })
    if (think.has(rs)) {
      ctx.success(rs)
    } else {
      ctx.f('delete', ctx.moduleName)
    }

  }
}