'use strict'

const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.throw('错误啦')
  }
}

module.exports = HomeController
