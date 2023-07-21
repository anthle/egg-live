'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/admin/manager/create', controller.admin.manager.create)
  router.get('/admin/manager', controller.admin.manager.index)
  router.post('/admin/manager', controller.admin.manager.save)
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete)
}
