const crypto = require('node:crypto')

module.exports = (app) => {
  const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize

  const Manager = app.model.define('manager', {
    id: {
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '用户名',
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '密码',
      set(val) {
        const hmac = crypto.createHash('sha256', app.config.crypto.secret)
        hmac.update(val)
        const hash = hmac.digest('hex')
        this.setDataValue('password', hash)
      },
    },
    created_time: DATE,
    updated_time: DATE,
  })
  return Manager
}
