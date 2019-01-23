const url = require('url')
const https = require('https')
const http = require('http')

function request(message) {
  const messageError = checkMessageForError(message)

  if (messageError) {
    return Promise.reject(new Error(messageError))
  }

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

function checkMessageForError(message) {
  if (!message.url.startsWith('http://') && !message.url.startsWith('https://')) {
    return `Protocol not specified in message.url (${message.url}). Url should begin with either 'http://' or 'https://'`
  }
}

module.exports = { request }