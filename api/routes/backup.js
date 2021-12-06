var express = require('express')

var fakeDBHelper = require('../helpers/fakeJsonDBHelper')
var animaisBackupData = require('../data/backup/animais.json')
var animais = require('../data/animais.json')
var usuariosBackupData = require('../data/backup/usuarios.json')
var usuarios = require('../data/backup/usuarios.json')
var doacoesBackupData = require('../data/backup/doacoes.json')
var doacoes = require('../data/backup/doacoes.json')
const fs = require('fs')

module.exports = (() => {
    'use strict'
    var backup = express.Router()

    backup.get('/', (req, res) => {
        fakeDBHelper.writeToJson('animais', animaisBackupData)
        fakeDBHelper.writeToJson('usuarios', usuariosBackupData)
        fakeDBHelper.writeToJson('doacoes', doacoesBackupData)
        res.status(200)
        res.json({success: true})
    })

    backup.get('/animais', (req, res) => {
        fakeDBHelper.writeToJson('animais', animaisBackupData)
        res.json(animaisBackupData)
    })

    backup.get('/usuarios', (req, res) => {
        fakeDBHelper.writeToJson('usuarios', usuariosBackupData)
        res.json(usuariosBackupData)
    })

    backup.get('/doacoes', (req, res) => {
        fakeDBHelper.writeToJson('doacoes', doacoesBackupData)
        res.json(doacoesBackupData)
    })

    return backup
})()
