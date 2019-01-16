const url = require('url')
const https = require('https')
const http = require('http')

function request(message) {
  let parsedUrl = url.parse(message.url)

  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: message.method,
    headers: message.headers
  }

  return new Promise((resolve, reject) => {
    const protocol = parsedUrl.protocol === 'https:' ? https : http

    const request = protocol.request(options, (response) => {
      let body = []

      response.on('data', function (data) {
        body.push(data)
      })

      response.on('end', function () {
        resolve({ statusCode: response.statusCode, body: Buffer.concat(body), headers: response.headers })
      })
    })

    request.on('error', function (err) {
      reject(err)
    })

    if (message.body) {
      request.write(message.body)
    }

    request.end()
  })
}

module.exports = { request }