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

Given('Faço uma requisição {string} para {string}', (verb, path) => {
    switch (verb) {
        case 'GET': {
            spec.get(`${baseUrl}${path}`).withRequestTimeout(10000)
            break
        }
        case 'POST': {
            spec.post(`${baseUrl}${path}`).withRequestTimeout(10000)
            break
        }
        case 'DELETE': {
            spec.delete(`${baseUrl}${path}`).withRequestTimeout(10000)
            break
        }
        case 'PUT': {
            spec.put(`${baseUrl}${path}`).withRequestTimeout(10000)
            break
        }
    }
})

Given('Adiciono um parâmetro {int} para a rota em questão', id => {
    spec.withPathParams('id', id)
})

Given('Adiciono um corpo {} para a rota em questão', body => {
    spec.withBody(JSON.parse(body))
})

When('Recebo uma resposta', async () => {
    await spec.toss()
})

Then('Espero que a resposta retorne um status {int}', code => {
    spec.response().should.have.status(code)
})

Then(
    /^Espero que a resposta retorne um array no formato json: (.*)$/,
    response => {
        spec.response().should.have.jsonMatch(eachLike(JSON.parse(response)))
    }
)

Then(
    /^Espero que a resposta retorne um objeto no formato json: (.*)$/,
    response => {
        spec.response().should.have.jsonMatch(like(JSON.parse(response)))
    }
)
