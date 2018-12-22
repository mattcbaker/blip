<p align="center">
  <img width="460" height="300" src="https://i.imgur.com/RzBwAUm.png">
</p>

## Blip
[![Build Status](https://travis-ci.com/mattcbaker/blip.svg?token=YvkgqpiszGV5r7aytqLv&branch=master)](https://travis-ci.com/mattcbaker/blip)
[![npm version](https://badge.fury.io/js/%40mattcbaker%2Fblip.svg)](https://badge.fury.io/js/%40mattcbaker%2Fblip)

Blip is making Node HTTP(S) transactions a little more pleasant.

### Install
`npm i @mattcbaker/blip`

### Example
```js
const { request } = require('@mattcbaker/blip')

// be sure to handle your errors!
const result = await request({ url: 'https://httpbin.org/get' })

console.log(result.body.toString())
```

### API
**request**
```js
request({
 url: 'https://httpbin.org/get',
 headers: {
  'User-Agent': 'Blip 1.0.0 https://github.com/mattcbaker/blip'
 },
 body: 'hi from Blip!',
 method: 'POST'
})
```
resulting response
```js
{
 statusCode: 200,
 headers: {...}
 body: <Buffer ...>
}
```



### Blip has a few opinions (don't we all?)
- The HTTP spec refers to message bodies as "body" and the Blip API reflects that.
- Blip will _not_ return an error based on _any_ status code. For example, Blip will not return an error when a server responds with a 5xx HTTP status code.

### Common questions
 - **Why doesn't the API have methods for each HTTP verb, e.g. GET, POST, PUT?**
   - No doubt these convenience methods are handy. But, they aren't without a cost -- increasing the API surface. Blip has chosen to have as small an API surface as possible, so we've decided to forego those convenience methods.
 - **Why return a `Buffer` for the body?**
   - This choice is rooted in the fact that Node is based on streams. The response body from an HTTP request is a stream, Blip tries to make your life a little easier by loading that stream into a buffer. If you'd like the `utf8` encoding of the body, [buffer.toString()](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end) is a good choice.

### License
[MIT](LICENSE.md)
