const jwt = require('jsonwebtoken')
const Base = require('./base.js')
const fs = require('fs')
const path = require('path')
// 1
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '用户'
    ctx.modelName = 'user'
  }
  async signinAction() {
    let ctx = this.ctx
    let body = this.post()
    let user = await ctx.model(ctx.modelName).where({ name: body.name }).find()
    // 如果账号已经存在，就是登录，否则就是注册
    if (think.has(user)) {
      user = await ctx.model(ctx.modelName).where(body).find()
      if (think.has(user)) {
        let token = jwt.sign({ id: user.id }, think.tokenKey, { expiresIn: 60 * 60 * 12 })
        user = await ctx.model(ctx.modelName).infoByUserId(user.id)
        user.token = token
        ctx.success(user)
      }else{
        ctx.fail(90102, `账号或者密码错误`)
      }
    } else {
      body.create_time = Date.now()
      body.pay_password = '123456'
      body.role_id = 3
      body.nickname = body.name
      let rs = await ctx.model(ctx.modelName).add(body)
      if (think.has(rs)) {
        body.id = rs
        let token = jwt.sign({ id: body.id }, think.tokenKey, { expiresIn: 60 * 60 * 12 })
        body = await ctx.model(ctx.modelName).infoByUserId(body.id)
        body.token = token
        ctx.success(body)
      } else {
        ctx.fail(90104, `注册失败`)
      }
    }

  }
  // async signupAction() {
  //   let ctx = this.ctx
  //   let body = this.post()
  //   let rs = await ctx.model(ctx.modelName).where(`name='${body.name}'`).count()
  //   if (think.has(rs)) {
  //     return ctx.fail(90103, `账号已存在`)
  //   }
  //   body.create_time = Date.now()
  //   rs = await ctx.model(ctx.modelName).add(body)
  //   if (think.has(rs)) {
  //     body.id = rs
  //     let token = jwt.sign({ id: body.id }, think.tokenKey, { expiresIn: 60 * 60 * 12 })
  //     body = await ctx.model(ctx.modelName).infoByUserId(body.id)
  //     body.token = token
  //     ctx.success(body)
  //   } else {
  //     ctx.fail(90104, `注册失败`)
  //   }

  // }
  // async signoutAction() {
  //   let ctx = this.ctx
  //   ctx.success('登出成功')
  // }

  // 获取用户信息包含地址列表
  async infoAction() {
    let ctx = this.ctx
    if (think.isEmpty(ctx.user)) {
      return await ctx.checkAuth()
    }
    let user = await ctx.model(ctx.modelName).infoByUserId(ctx.user.id)
    if (think.has(user)) {
      ctx.success(user)
    } else {
      ctx.f('index', ctx.moduleName)
    }
  }

  async settingAction() {
    let ctx = this.ctx
    let body = this.post()
    body.update_time = Date.now()
    let rs = await ctx.model(ctx.modelName).where({ id: ctx.user.id }).update(body)
    if (think.has(rs)) {
      ctx.success(body)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }

  async avatarAction() {
    let ctx = this.ctx
    let file = this.file('avatar')
    let type = file.type
    if (type.indexOf('image') === -1) {
      return ctx.fail(90122, '请上传正确的图片格式')
    }
    let ext = type.split('/')[1]
    let create_time = Date.now()
    let filePath = this.config('uploadPath') + '/' + create_time + '.' + ext
    let realPath = path.join(think.APP_PATH, filePath)
    if (!think.isDirectory(path.dirname(realPath))) {
      think.mkdir(path.dirname(realPath))
    }
    let rs = await ctx.model(ctx.modelName).where({ id: ctx.user.id }).update({ avatar: filePath })
    if (think.has(rs)) {
      await think.promisify(fs.rename)(file.path, realPath)
      ctx.user.avatar = filePath
      return this.success(ctx.user)
    } else {
      return this.fail(90121, `上传图片失败`)
    }
  }


  async updatePasswordAction() {
    let ctx = this.ctx
    let body = this.post()
    body.update_time = Date.now()
    let count = await ctx.model(ctx.modelName).where({ id: ctx.user.id, password: body.password }).count()
    if (count == 0) {
      return ctx.fail(90131, `旧登录密码验证错误`)
    }
    let rs = await ctx.model(ctx.modelName).where({ id: ctx.user.id }).update({ password: body.newPassword })
    if (think.has(rs)) {
      ctx.success(body)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }

  async updatePayPasswordAction() {
    let ctx = this.ctx
    let body = this.post()
    body.update_time = Date.now()
    let count = await ctx.model(ctx.modelName).where({ id: ctx.user.id, pay_password: body.password }).count()
    if (count == 0) {
      return ctx.fail(90131, `旧支付密码验证错误`)
    }
    let rs = await ctx.model(ctx.modelName).where({ id: ctx.user.id }).update({ pay_password: body.newPassword })
    if (think.has(rs)) {
      ctx.success(body)
    } else {
      ctx.f('update', ctx.moduleName)
    }
  }

}