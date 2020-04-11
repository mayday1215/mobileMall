module.exports = {
  tokenKey:'fang',
  has(x){
    return !think.isEmpty(x)
  },
  isBoolInt(num){
    num = parseInt(num)
    if(num === 1 || num === 0){
      return true
    }else{
      return false
    }
  },
  isPositiveInt(num) {
    if(think.isInt(num) && num > 0){
      return true
    }else{
      return false
    }
  },
  isNotPositiveInt(num) {
    return !this.isPositiveInt(num)
  },
  isParsePositiveInt(num) {
    num = parseInt(num)
    return this.isPositiveInt(num)
  },
  isNotParsePositiveInt(num) {
    return !this.isParsePositiveInt(num)
  }
}