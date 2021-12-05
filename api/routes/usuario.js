const Joi = require('joi')
var express = require('express')
const bcrypt = require('bcrypt')

var usuariosData = require('../data/usuarios.json')
const fakeDBHelper = require('../helpers/fakeJsonDBHelper')

const schema = Joi.object({
    nome: Joi.string().min(3).required(),
    passwd: Joi.string()
        .pattern(
            new RegExp(
                '^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$'
            )
        )
        .required(),
    cpf: Joi.string().min(11).max(11).required(),
    animais: Joi.array().items(Joi.number().integer()),
})

module.exports = (() => {
    'use strict'
    var usuarios = express.Router()

    usuarios.get('', (req, res) => {
        res.json(usuariosData)
    })

    usuarios.get('/:id', (req, res) => {
        const usuario = usuariosData.find(
            (u) => u.id === parseInt(req.params.id)
        )

        if (!usuario)
            return res.status(404).json({
                success: false,
                msg: 'Usuário não existe',
            })

        res.json(usuario)
    })

    usuarios.post('', (req, res) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.details[0].message,
            })
        }

        const usuario = {
            id: usuariosData.length + 1,
            nome: req.body.nome,
            passwd: bcrypt.hashSync(req.body.passwd, 10),
            cpf: req.body.cpf,
            animais: req.body.animais,
        }

        usuariosData.push(usuario)
        fakeDBHelper.writeToJson('usuarios', usuariosData)
        res.json(usuariosData)
    })

    usuarios.put('/:id', (req, res) => {
        const usuario = usuariosData.find(
            (u) => u.id === parseInt(req.params.id)
        )

        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario não cadastrado',
            })
        }

        usuario.nome = req.body.nome ? req.body.nome : usuario.nome
        usuario.passwd = req.body.passwd ? bcrypt.hashSync(req.body.passwd, 10) : usuario.passwd
        usuario.cpf = req.body.cpf ? req.body.cpf : usuario.cpf
        usuario.animais = req.body.animais ? req.body.animais : usuario.animais

        fakeDBHelper.writeToJson('usuarios', usuariosData)
        res.json(usuario)
    })

    usuarios.delete('/:id', (req, res) => {
        const usuario = usuariosData.find(
            (u) => u.id === parseInt(req.params.id)
        )

        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario não cadastrado',
            })
        }

        const index = usuariosData.indexOf(usuario)
        usuariosData.splice(index, 1)

        fakeDBHelper.writeToJson('usuarios', usuariosData)
        res.json(usuariosData)
        
    })

    return usuarios
})()
