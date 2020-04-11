const Base = require('./base')

module.exports = class extends Base {
  async signinAction(){
    this.allowMethods = 'post'
    let ctx = this.ctx
    let { name, password } = this.post()
    if (think.isEmpty(name)) {
      return ctx.f('required', 'name')
    }
    if (think.isEmpty(password)) {
      return ctx.f('required', 'password')
    }
  }
}