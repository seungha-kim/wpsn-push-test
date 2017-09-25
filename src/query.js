const bcrypt = require('bcrypt')

const knex = require('./knex')

module.exports = {
  /**
   * 사용자 레코드를 생성합니다.
   * @param {String} username - 사용자 이름
   * @param {String} password - 해시 적용 전 암호
   * @returns {Promise}
   */
  createUser(username, password) {
    const hashed_password = bcrypt.hashSync(password, 10)
    return knex('user')
      .insert({
        username,
        hashed_password
      })
  },
  /**
   * 사용자 정보와 일치하는 사용자가 있는지의 여부를 반환합니다.
   * @param {String} username - 사용자 이름
   * @param {String} password - 해시 적용 전 암호
   * @returns {Promise} - user
   */
  compareUser(username, password) {
    return knex('user')
      .where({username})
      .first()
      .then(user => {
        if (user) {
          const isMatch = bcrypt.compareSync(password, user.hashed_password)
          if (isMatch) {
            return user
          }
        }
        throw new Error('사용자 이름 혹은 비밀번호가 일치하지 않습니다.')
      })
  },
  getUserById(id) {
    return knex('user')
      .where({id})
      .first()
  }
}
