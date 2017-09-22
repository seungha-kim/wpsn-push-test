const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const query = require('./query')

const app = express()

app.use(bodyParser.json())

app.post('/user', (req, res) => {
  // 사용자 생성
  const {username, password} = req.body
  query.createUser(username, password)
    .then(([id]) => {
      // JWT 발행
      const token = jwt.sign({id}, 'mysecret')
      // 반환
      res.send({
        token
      })
    })
})

app.post('/login', (req, res) => {

})

app.listen(3000, () => {
  console.log('listening...')
})
