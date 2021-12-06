var animais = require('./routes/animais')
var usuarios = require('./routes/usuario')
var doacoes = require('./routes/doacoes')
var backup = require('./routes/backup')
const express = require('express')
const PORT = 3000
const HOST = '127.0.0.1'
const app = express()

app.use(express.json())

app.use('/v1/animais', animais)
app.use('/v1/usuarios', usuarios)
app.use('/v1/doacoes', doacoes)
app.use('/v1/backup', backup)

// app.get('/*', express.json(), function (req, res) {
//     res.json({success: false, error: 404})
//     res.sendStatus(404);
// });

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)