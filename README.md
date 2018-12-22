## Blip
[![Build Status](https://travis-ci.com/mattcbaker/blip.svg?token=YvkgqpiszGV5r7aytqLv&branch=master)](https://travis-ci.com/mattcbaker/blip)
[![npm version](https://badge.fury.io/js/%40mattcbaker%2Fblip.svg)](https://badge.fury.io/js/%40mattcbaker%2Fblip)

Blip is an attempt to make the world a better place with easier HTTP(S) transactions.

### Example!
```
const { request } = require('@mattcbaker/blip')

// be sure to handle your errors!
const result = await request({ url: 'https://httpbin.org/get' })
```

### Blip has a few opinions (don't we all?)
- The HTTP spec refers to message bodies as "body" and the Blip API reflects that.
- Blip will _not_ return an error based on _any_ status code. For example, Blip will not return an error when a server responds with a 5xx HTTP status code.

### Common questions
 - **Why doesn't the API have methods for each HTTP verb, e.g. GET, POST, PUT?**
   - No doubt those convenience methods are handy. But, they aren't without a cost -- increasing the API surface. Blip has chosen to have as small an API surface as possible, so we've decided to forego those convenience methods.

### License
[MIT](LICENSE.md)
