require('dotenv').config()
const express = require('express')
const app = express()
require('./src/config/dbConfig')
  .then(res =>{
    console.log('Banco carregado,')
    app.emit('Ready')
  })
  .catch(e => console.log(e))

const userRoutes = require('./src/routes/userRoutes')
const tokenRoutes = require('./src/routes/tokenRoutes')
const transitionRoutes = require('./src/routes/transitionRoutes')

app.use(express.json())
app.use('/users', userRoutes)
app.use('/tokens', tokenRoutes)
app.use('/transitions', transitionRoutes)

app.on('Ready', () =>{
    app.listen(process.env.PORT, () =>{
        console.log('Server is running...')
    })
})