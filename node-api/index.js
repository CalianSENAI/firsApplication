const express = require('express')
const cors = require('cors')
const { get } = require('http')
const { json } = require('body-parser')

const app = express()

app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json())

let users = [{
  id: 1,
  email: "calian@rapidsoft.com",
  login: "Calian_RVTM",
  password: "12345678",
  name: "Calian"
}]


app.route('/api').get((req, res) => res.json({
  users
}))

//validar email
app.get('/api/validate/:email',(req, res) => {
  const idEmail = req.params.email

  const user = users.find(user => String(user.email) === String(idEmail))

  if (!user) {
    return res.json(false)
  }

  res.json(true)
})

//Pegar usuário pelo id
app.route('/api/:id').get((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  res.json(user)
})

//Fazer login
app.get('/api/login/:login/:password', (req,res) => {
    const idLogin = req.params.login
    const idPassword = req.params.password
    console.log(idLogin +" - "+ idPassword)
    const user = users.find(user => String(user.login) === String(idLogin))
    const password = users.find(password => String(password.password) === String(idPassword))
    if(!user || !password){return res.json(false)}
    //if(!password){return res.json(false)}
    res.json(true)
})


//Criar usuário
app.route('/api').post((req, res) => {
  const lastId = users[users.length - 1].id
  console.log(req.body)
  
  users.push({
    id: lastId + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    login: req.body.login
  })
  
  
  res.json('Saved user')
})

app.post('/api/post', (req, res) => {
    const name = req.body.name
    const emai = req.body.email
    const password = req.body.password
    const login = req.body.login
    res.json(req.body)
})


app.route('/api/:id').put((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  const updatedUser = {
    ...user,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    login: req.body.login
  }

  users = users.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("Updated user")
})

app.route('/api/:id').delete((req, res) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Deleted User')
})