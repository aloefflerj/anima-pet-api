var animais = require('./routes/animais')
var usuarios = require('./routes/usuario')
const express = require('express')
const PORT = 3000
const HOST = '0.0.0.0'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Anima Pet Api')
})

app.use('/v1/animais', animais)
app.use('/v1/usuarios', usuarios)


app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)