const jwt = require('jsonwebtoken')

module.exports = {
  f(type, name) {
    switch (type) {
      case 'all':
        return this.fail(90201, `查询数据失败`)
      case 'index':
        return this.fail(90202, `此${name}不存在`)
      case 'create':
        return this.fail(90203, `创建${name}失败`)
      case 'update':
        return this.fail(90204, `更新${name}失败`)
      case 'delete':
        return this.fail(90205, `删除${name}失败`)
      case 'needAuth':
        // this.status = 401
        return this.fail(90101, '令牌验证失败, 请重新登录')
      case 'noAuth':
        return this.fail(90111, '令牌验证失败, 无法操作')
      case 'needSuperAuth':
        return this.fail(90105, '需要超级管理员权限')
      case 'required':
        return this.fail(90210, `必须要传${name}`)
      case 'positiveInt':
        return this.fail(90211, `${name}必须是正整数`)
      case 'array':
        return this.fail(90212, `${name}必须是数组`)
      case 'boolInt':
        return this.fail(90213, `${name}必须是1或者0`)
      default:
        break;
    }

  },
  async checkAuth() {
    // let type = needSignin ? 'needAuth' : 'noAuth'
    try {
      this.user = jwt.verify(this.token, think.tokenKey)
      if (think.isEmpty(this.user)) {
        return this.f('needAuth')
      }
    } catch (error) {
      return this.f('needAuth')
    }
  }
}