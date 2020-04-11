const Base = require('./base.js');
const xlsx = require('node-xlsx')

module.exports = class extends Base {
  constructor(ctx) {
    super(ctx)
    ctx.moduleName = '云拓学生excel'
    ctx.modelName = 'yuntuo_stu_excel'
  }
  async uploadAction() {
    let ctx = this.ctx
    let rs = await ctx.model('yuntuo_stu_excel').select()
    if(this.isPost){
    let file = this.file('file')
    if (file && file.path) {
      
      let data = xlsx.parse(file.path)
      if (Array.isArray(data[0].data)) {
        let list = data[0].data
        for (let i = 1; i < list.length; i++) {
          let subs = list[i]
          let dup = false
          for(let k = 0; k < rs.length; k++){
            if(rs[k].name == subs[0] && rs[k].age == subs[1]){
              dup = true
            }
          }
          let insertData = {}
          for (let j = 0; j < subs.length; j++) {
            insertData.name = subs[0]
            insertData.age = subs[1]
          }
          if(!dup){
            let insertId = await ctx.model('yuntuo_stu_excel').add(insertData)
            if(insertId > 0){
              insertData.id = insertId
              rs.push(insertData)
            }
          }

        }
      }
      return this.success(rs)
    }

  }else{
    this.assign('list', Array.isArray(rs) ? rs : [])
    return await this.display('excel')
  }

    
  }

  async compareAction() {
    let ctx = this.ctx
    let file = this.file('file')
    let rt = []
    if (file && file.path) {
      let rs = await ctx.model('yuntuo_stu_excel').select()
      let data = xlsx.parse(file.path)
      
      if (Array.isArray(data[0].data)) {
        let list = data[0].data
        for (let i = 1; i < list.length; i++) {
          let subs = list[i]
          for(let k = 0; k < rs.length; k++){
            if(rs[k].name == subs[0] && rs[k].age == subs[1]){
              rt.push(rs[k])
            }
          }

        }
      }
      
    }
    return this.success(rt)
  }
}