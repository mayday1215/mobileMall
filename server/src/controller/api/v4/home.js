module.exports = class extends think.Controller {
  async indexAction(){
    this.display('index')
  }
}