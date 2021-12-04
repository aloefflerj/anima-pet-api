var fs = require('fs')
const Joi = require('joi');
var express = require('express');

var animaisData = require('../data/animais.json')
var fakeDBHelper = require('../helpers/fakeJsonDBHelper')

const schema = Joi.object({
    nome: Joi.string().min(3).required(),
    raca: Joi.string().min(3).required(),
    idade: Joi.number().integer().required()
})

module.exports = (function () {
    'use strict';
    var animais = express.Router();

    animais.get('', function (req, res) {
        res.json(animaisData);
    })

    animais.get('/:id', function (req, res) {
        const animal = animaisData.find(a => a.id === parseInt(req.params.id));

        if (!animal)
            return res.status(404).send('not found');

        res.json(animal);
    });

    animais.post('', function (req, res) {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const animal = {
            id: animaisData.length + 1,
            nome: req.body.nome,
            raca: req.body.raca,
            idade: req.body.idade
        }

        animaisData.push(animal)
        fakeDBHelper.writeToJson('animais', animaisData)
        res.send(animaisData)
    })

    animais.put('/:id', (req, res) => {
        const animal = animaisData.find(a => a.id === parseInt(req.params.id));

        if (!animal)
            return res.status(404).send('not found');

        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        animal.nome = req.body.nome ? req.body.nome : animal.nome
        animal.raca = req.body.raca ? req.body.raca : animal.raca
        animal.idade = req.body.idade ? req.body.idade : animal.idade

        fakeDBHelper.writeToJson('animais', animaisData)
        res.send(animal)
    })

    animais.delete('/:id', (req, res) => {
        const animal = animaisData.find(a => a.id === parseInt(req.params.id));

        if (!animal)
            return res.status(404).send('not found');

            const index = animaisData.indexOf(animal)
            animaisData.splice(index, 1)

            fakeDBHelper.writeToJson('animais', animaisData)
            res.send(animaisData)

    })

    return animais;
})();