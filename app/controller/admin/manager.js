'use strict'

const Controller = require('egg').Controller

class ManagerController extends Controller {
  async index() {
    const { ctx } = this
    const data = await ctx.page('Manager')
    const title = '管理员列表'
    await ctx.renderTemplate({
      data,
      title,
      table: {
        // 按钮
        buttons: {
          add: '/admin/manager/create',
        },
        // 表头
        columns: [{
          title: '管理员',
          fixed: 'left',
          key: 'username',
        }, {
          title: '时间',
          key: 'created_time',
          width: 180,
          fixed: 'center',
        }, {
          title: '操作',
          width: 200,
          fixed: 'center',
          action: {
            edit(id) {
              return `/admin/manager/edit/${id}`
            },
            delete(id) {
              return `/admin/manager/delete/${id}`
            },
          },
        }],
        data,
      },
    })
  }

  // 创建管理员
  async create() {
    const { ctx } = this
    await ctx.renderTemplate({
      // 页面标题
      title: '创建管理员',
      // 模板类型 form表单，table表格分页
      tempType: 'form',
      // 表单配置
      form: {
        // 提交地址
        action: '/admin/manager',
        // 字段配置
        fields: [{
          label: '用户名',
          type: 'text',
          name: 'username',
          placeholder: '用户名',
        }, {
          label: '密码',
          type: 'text',
          name: 'password',
          placeholder: '密码',
        }],
      },
      // 新增成功跳转路径
      successUrl: '/admin/manager',
    })
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

  // 删除管理员
  async delete() {
    const { ctx, app } = this
    const id = ctx.params.id
    await app.model.Manager.destroy({
      where: {
        id,
      },
    })
    ctx.toast('删除成功', 'success')

    ctx.redirect('/admin/manager')
  }
}

module.exports = ManagerController
