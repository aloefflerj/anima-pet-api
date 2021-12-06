const { Given, When, Then, Before } = require('@cucumber/cucumber')
const animais = require('../../../data/animais.json')
const usuarios = require('../../../data/usuarios.json')
const doacoes = require('../../../data/doacoes.json')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const assert = require('assert')
var context = []

const baseUrl = 'http://localhost:3000/v1'

Given('Um animal de id {int}', id => {
    context['animal'] = animais.find(a => a.id === id)
})

Given('Um usuário de id {int}', id => {
    context['usuario'] = usuarios.find(u => u.id === id)
})

Given('Uma doação de id {int}', id => {
    context['doacao'] = doacoes.find(d => d.id === id)
})

When('Este animal existe', () => {
    if(context['animal'] === undefined) return false
})

When('Este usuário existe', () => {
    if(context['usuario'] === undefined) return false
})

When('Esta doação existe', () => {
    if(context['doacao'] === undefined) return false
})

Then('Dados de animais devem ser validados', () => {
    const animal = context['animal']
    Joi.assert(animal.id, Joi.number().integer().required())
    Joi.assert(animal.nome, Joi.string().required())
    Joi.assert(animal.raca, Joi.string().required())
    Joi.assert(animal.idade, Joi.number().integer().required())
})

Then('Dados de usuario devem ser validados', () => {
    const usuario = context['usuario']
    Joi.assert(usuario.id, Joi.number().integer().required())
    Joi.assert(usuario.nome, Joi.string().required())
    Joi.assert(usuario.passwd, Joi.string().regex(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$/))
    Joi.assert(usuario.cpf, Joi.string().length(11))
    Joi.assert(usuario.animais, Joi.array())
})

Then('Dados de doações devem ser validadas', () => {
    const doacao = context['doacao']
    Joi.assert(doacao.id, Joi.number().integer().required())
    Joi.assert(doacao.doador, Joi.number().integer().required())
    Joi.assert(doacao.donatario, Joi.number().integer().required())
    Joi.assert(doacao.tipo, Joi.string().required())
})
