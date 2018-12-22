const assert = require('assert')
const { request } = require('./index')

describe('get', function () {
  describe('a typical get', function () {
    let result = {}

    before(async function () {
      result = await request({ url: 'https://httpbin.org/get', headers: { foo: 'bar-star-car' } })
    })

    it('should get some headers', function () {
      assert.ok(!!result.headers && Object.keys(result.headers).length > 0, 'Expected at least one header, got none.')
    })

    it('should get foo header at server', function () {
      assert.ok(result.body.toString().indexOf('bar-star-car') > 1, `Expected bar-star-car in body, instead got ${result.body.toString()}`)
    })

    it('should get a body', function () {
      assert.ok(result.body.length > 0, 'Expected a body, got none.')
    })

    it('should have a 200 status code', function () {
      assert.ok(result.statusCode === 200, `Expected a 200 status code, got ${result.statusCode}.`)
    })
  })

  describe('when request is http', function () {
    let body = {}

    before(async function () {
      const result = await request({ url: 'http://httpbin.org/get', headers: { foo: 'bar-star-car' } })
      body = JSON.parse(result.body.toString())
    })

    it('should have response from an http url', function () {
      assert.ok(body.url.startsWith('http://'), `Expected ${body.url} to start with 'http://'`)
    })
  })

  describe('when response is a 500', function () {
    let result = {}
    let caughtError = false
    let error = {}

    before(async function () {
      try {
        result = await request({ url: 'https://httpstat.us/500' })
      } catch (e) {
        caughtError = true
        error = e
      }
    })

    it('should have 500 status code', function () {
      assert.ok(result.statusCode === 500, `Expected a 500 status code, got ${result.statusCode}.`)
    })

    it('should have no error', function () {
      assert.ok(caughtError === false, `Expected no error, got ${error}.`)
    })
  })

  describe('when there is an http(s) failure', function () {
    let caughtError = false

    before(async function () {
      try {
        await request({ url: 'https://lkasjdflkj897827349817234kjlkajsdlkfjlaksdjf897as98d7f8977zcxlcbkjlzkxjcvlkjzxcvlkjzxcvj.upt' })
      } catch (e) {
        caughtError = true
      }
    })

    it('should have an error', function () {
      assert.ok(caughtError === true, 'Expected an error, got none.')
    })
  })
})