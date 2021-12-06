const Joi = require('joi')
var express = require('express')

var doacoesData = require('../data/doacoes.json')
var fakeDBHelper = require('../helpers/fakeJsonDBHelper')

const schema = Joi.object({
    doador: Joi.number().integer().required(),
    donatario: Joi.number().integer().required(),
    tipo: Joi.string().min(3).required(),
})

module.exports = (() => {
    'use strict'
    var doacoes = express.Router()

    doacoes.get('', (req, res) => {
        res.json(doacoesData)
    })

    doacoes.get('/:id', (req, res) => {
        const doacao = doacoesData.find(d => d.id === parseInt(req.params.id))

        if (!doacao) {
            return res.status(404).json({
                success: false,
                msg: 'Doação não existe',
            })
        }

        res.json(doacao)
    })

    doacoes.post('', (req, res) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.details[0].message,
            })
        }

        const doacao = {
            id: doacoesData.length + 1,
            doador: req.body.doador,
            donatario: req.body.donatario,
            tipo: req.body.tipo,
        }

        doacoesData.push(doacao)
        // fakeDBHelper.writeToJson('animais', animaisData)
        res.json(doacoesData)
    })

    doacoes.put('/:id', (req, res) => {
        const doacao = doacoesData.find(d => d.id === parseInt(req.params.id))

        if (!doacao) {
            return res.status(404).json({
                success: false,
                msg: 'Doação não cadastrada',
            })
        }

        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        doacao.doador = req.body.doador ? req.body.doador : doacao.doador
        doacao.donatario = req.body.donatario ? req.body.donatario : doacao.donatario
        doacao.tipo = req.body.tipo ? req.body.tipo : doacao.tipo

        // fakeDBHelper.writeToJson('animais', animaisData)
        res.send(doacao)
    })

    doacoes.delete('/:id', (req, res) => {
        const doacao = doacoesData.find(d => d.id === parseInt(req.params.id))

        if (!doacao) {
            return res.status(404).json({
                success: false,
                msg: 'Doação não cadastrada',
            })
        }

        const index = doacoesData.indexOf(doacao)
        doacoesData.splice(index, 1)

        // fakeDBHelper.writeToJson('animais', animaisData)
        res.send(doacoesData)
    })

    return doacoes
})()
