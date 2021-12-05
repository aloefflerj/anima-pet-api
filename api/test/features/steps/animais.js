const { Given, When, Then, AfterAll, After } = require('@cucumber/cucumber')
const assert = require('assert').strict
const axios = require('axios')
const context = []

Given('The animal with {int} exists', async id => {
    context['id'] = id
})

When('I send GET request to {}', async path => {
    const response  = await axios.get(`http://localhost:3000/v1${path}/${context['id']}`)
    context['response'] = response
})

Then(/^I receive (.*)$/, async expectedResponse => {
    assert(context['response'].data, expectedResponse)
})