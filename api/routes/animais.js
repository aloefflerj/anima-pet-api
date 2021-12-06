const Joi = require('joi')
var express = require('express')

var animaisData = require('../data/animais.json')
var fakeDBHelper = require('../helpers/fakeJsonDBHelper')

const schema = Joi.object({
    nome: Joi.string().min(3).required(),
    raca: Joi.string().min(3).required(),
    idade: Joi.number().integer().required(),
})

module.exports = (() => {
    'use strict'
    var animais = express.Router()

    animais.get('', (req, res) => {
        res.json(animaisData)
    })

    animais.get('/:id', (req, res) => {
        const animal = animaisData.find((a) => a.id === parseInt(req.params.id))

        if (!animal) {
            return res.status(404).json({
                success: false,
                msg: 'Animal não existe',
            })
        }

        res.json(animal)
    })

    animais.post('', (req, res) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.details[0].message,
            })
        }

        const animal = {
            id: animaisData.length + 1,
            nome: req.body.nome,
            raca: req.body.raca,
            idade: req.body.idade,
        }

        animaisData.push(animal)
        // fakeDBHelper.writeToJson('animais', animaisData)
        res.json(animaisData)
    })

    animais.put('/:id', (req, res) => {
        const animal = animaisData.find((a) => a.id === parseInt(req.params.id))

        if (!animal) {
            return res.status(404).json({
                success: false,
                msg: 'Animal não cadastrado',
            })
        }

        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        animal.nome = req.body.nome ? req.body.nome : animal.nome
        animal.raca = req.body.raca ? req.body.raca : animal.raca
        animal.idade = req.body.idade ? req.body.idade : animal.idade

        // fakeDBHelper.writeToJson('animais', animaisData)
        res.send(animal)
    })

    animais.delete('/:id', (req, res) => {
        const animal = animaisData.find((a) => a.id === parseInt(req.params.id))

        if (!animal) {
            return res.status(404).json({
                success: false,
                msg: 'Animal não cadastrado',
            })
        }

        const index = animaisData.indexOf(animal)
        animaisData.splice(index, 1)

        // fakeDBHelper.writeToJson('animais', animaisData)
        res.send(animaisData)
    })

    return animais
})()
