# @vikhola/content-type

# About

Basic HTTP content-type parser and serializer for HTTP servers.

# Installation

```sh
$ npm i @vikhola/content-type
```

# Usage

Package could be required as ES6 module 

```js
import { ContentType } from '@vikhola/content-type'
```

Or as commonJS module.

```js
const { ContentType } = require('@vikhola/content-type');
```

## class: `ContentType`

The ContentType accepts an optional type and parameters that will be assigned to its instance.

```js
const contentType = new ContentType('text/html', { charset: 'utf-8', foo: 'bar' });
```

If type is not a string or contains invalid characters, an error will be thrown.

```js
// throw an Error
const contentType = new ContentType('text/html\n');
```

### contentType.type

The `contentType.type` is current Content-Type type.

```js
const contentType = new ContentType('text/html')

// print: text/html
console.log(contentType.type);
```

### contentType.params 

The `contentType.params` a object that contains the current type parameters.

```js
const contentType = new ContentType('text/html', { charset: 'utf-8', foo: 'bar' });

// print: { charset: 'utf-8', foo: 'bar' }
console.log(contentType.params);
```

### ContentType.from()

The `ContentType.from()` static method takes an HTTP Content-Type header, parses it, and returns a ContentType instance with type and params.

If the content type header is not a string or some parameters contain invalid characters, the ContentType instance will have an empty `type` property and an empty `params` object after initialization.

```js
const contentType = ContentType.from('text/html; charset=utf-8; foo=bar')

// print: text/html
console.log(contentType.type)

// print: { charset: 'utf-8', foo: 'bar' }
console.log(contentType.params)
```

### contentType.toString()
Return a string representation suitable to be sent as HTTP header.

```js
const contentType = new ContentType()

contentType.type = 'text/html'

// print: text/html
console.log(contentType.toString())

contentType.params = { charset: 'utf-8', foo: 'bar' }

// print: text/html; charset=utf-8; foo=bar
console.log(contentType.toString())
```

## License

[MIT](https://github.com/vikhola/content-type/blob/main/LICENSE)