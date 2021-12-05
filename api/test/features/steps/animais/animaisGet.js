const { Given, When, Then, AfterAll, After } = require('@cucumber/cucumber')
const assert = require('assert').strict
const axios = require('axios')
const Joi = require('joi')

const context = []
const baseUrl = 'http://localhost:3000/v1'

const schema = Joi.object({
    id: Joi.number().integer().required(),
    nome: Joi.string().min(3).required(),
    raca: Joi.string().min(3).required(),
    idade: Joi.number().integer().required(),
})

Given('An animais request without id', async () => {
    context['id'] = false
})

Given('The animal with {int} exists', async id => {
    context['id'] = id
})

When('I send GET request to {}', async path => {
    if (!context['id']) {
        const response = await axios.get(`${baseUrl}${path}`)
        context['response'] = response
    } else {
        const response = await axios.get(`${baseUrl}${path}/${context['id']}`)
        context['response'] = response
    }
})

Then(/^I receive from animais(.*)$/, async expectedResponse => {
    // assert.deepEqual(context['response'].data, JSON.parse(expectedResponse, null, 4))
    if (context['id']) {
        const { error } = schema.validate(context['response'].data)
        if (error)
            throw new Error(`Validation error ${error.details[0].message}`)
    } else {
        context['response'].data.map(res => {
            const { error } = schema.validate(res)
            if (error)
                throw new Error(`Validation error ${error.details[0].message}`)
        })
    }
})
