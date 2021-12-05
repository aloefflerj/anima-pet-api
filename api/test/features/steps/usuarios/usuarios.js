// steps.js
const pactum = require('pactum')
const { like, eachLike, string, int } = require('pactum-matchers')
const { Given, When, Then, Before } = require('@cucumber/cucumber')
const Joi = require('joi')
const assert = require('assert')
var context = []

const baseUrl = 'http://localhost:3000/v1'

let spec = pactum.spec()

Before(() => {
    spec = pactum.spec()
    context = []
})

// GET
Given('O usuário com id {int} exista', id => {
    context['id'] = id
})

Given('O usuário com id {int} não exista', id => {
    context['id'] = id
})

Given('Caso faça um request do tipo GET para {string}', uri => {
    if (context['id']) {
        spec.get(`${baseUrl}${uri}`).withPathParams('id', context['id'])
    } else {
        spec.get(`${baseUrl}${uri}`)
    }
})

// POST
Given('Um novo usuário {}', request => {
    context['request'] = request
})

Given('Caso faça um request do tipo POST para {string}', uri => {
    spec.post(`${baseUrl}${uri}`).withBody(JSON.parse(context['request']))
})

// DELETE/PUT
Given('Caso faça um request do tipo {string} para {string}', (verb, uri) => {
    context['verb'] = verb
    if(verb === 'DELETE') 
        spec.delete(`${baseUrl}${uri}`).withPathParams('id', context['id'])
    else
        spec.put(`${baseUrl}${uri}`).withPathParams('id', context['id']).withBody(JSON.parse(context['request']))
})

// PUT
Given('Atualização de dados {}', request => {
    context['request'] = request
})

// Common
When('Recebo resposta de usuarios', async () => {
    await spec.toss()
})

Then('A resposta deve retornar status {int}', async code => {
    spec.response().should.have.status(code)
})

Then(/^A resposta deve ser um json no padrão(.*)$/, expectedResponse => {
    if (context['verb'] === 'PUT' || (context['id'] && context['verb'] !== 'DELETE')) {
        spec.response().should.have.jsonMatch({
            id: int(),
            nome: string(),
            passwd: string(),
            cpf: string(),
            animais: eachLike(int()),
        })
    } else {
        spec.response().should.have.jsonMatch(
            eachLike({
                id: int(),
                nome: string(),
                passwd: string(),
                cpf: string(),
                animais: eachLike(int()),
            })
        )
    }
})

Then(/^A resposta deve ser da seguinte forma (.*)$/, expectedResponse => {
    spec.response().should.have.json(JSON.parse(expectedResponse, null, 4))
})
