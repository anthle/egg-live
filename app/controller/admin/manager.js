'use strict'

const Controller = require('egg').Controller

class ManagerController extends Controller {
  // 创建管理员
  async create() {
    const { ctx } = this
    await ctx.render('admin/manager/create.html')
  }

  async save() {
    const { ctx, app } = this

    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '管理员账户',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    })

    const { username, password } = ctx.request.body

    const res = await app.model.Manager.findOne({
      where: {
        username,
      },
    })

    if (res)
      return ctx.apiFail('该管理员已存在')

    const manager = await app.model.Manager.create({
      username, password,
    })
    ctx.apiSuccess(manager)
  }
}

module.exports = ManagerController
