const Base = require('./base')

module.exports = class extends Base {
  async createAction() {
    return false
  }
  async updateAction() {
    return false
  }
 }