'use strict';

const assert = require('node:assert');
const { it, describe } = require('node:test');
const { ContentType } = require('../lib/content-type.js')

describe('ContentType test', function() {

    describe('"type" option', function() {

        it('should set type', function(t) {
            const type = 'text/html'
            const aContentType = new ContentType(type)
            assert.strictEqual(aContentType.type, type)
        })
        
        it('should throw on invalid type', function () {
            assert.throws(() => new ContentType('text/html\n'), /ContentType isn\`t string or contain invalid characters./)
        })

    })

    describe('"params" option', function() {
        
        it('should set params', function(t) {
            const type = 'text/html'
            const params = { charset: 'utf-8', foo: 'bar' }
            const aContentType = new ContentType(type, params)
            assert.deepStrictEqual(aContentType.params, params)
        })
    
    })

    describe('"from" static method', function() {

        it('should set empty type', function() {
            const regexp = /^text\/html.*/
            const aContentType = ContentType.from(regexp)
            assert.strictEqual(aContentType.type, '')
        })

        it('should set type', function(t) {
            const header = 'text/html'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, header)
        })
        
        it('should set suffix type', function(t) {
            const header = 'image/svg+xml'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, header)
        })
    
        it('should set surrounding by OWS type', function(t) {
            const header = ' text/html '
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type,'text/html')
        })


        it('should set extra LWS params', function(t) {
            const header = 'text/html ; charset=utf-8 ; foo=bar'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, 'text/html')
            assert.deepStrictEqual(aContentType.params, {
                charset: 'utf-8',
                foo: 'bar'
            })
        })

        it('should set uppercase params', function(t) {
            const header = 'text/html; Charset=UTF-8'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, 'text/html')
            assert.deepStrictEqual(aContentType.params, {
                charset: 'UTF-8'
            })
        })

        it('should set quoted params', function(t) {
            const header = 'text/html; charset="UTF-8"'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, 'text/html')
            assert.deepStrictEqual(aContentType.params, {
                charset: 'UTF-8'
            })
        })

        it('should set params with escapes', function(t) {
            const header = 'text/html; charset="UT\\F-\\\\\\"8\\""'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, 'text/html')
            assert.deepStrictEqual(aContentType.params, {
                charset: 'UTF-\\"8"'
            })
        })

        it('should set balanced quotes params', function(t) {
            const header = 'text/html; param="charset=\\"utf-8\\"; foo=bar"; bar=foo'
            const aContentType = ContentType.from(header)
            assert.strictEqual(aContentType.type, 'text/html')
            assert.deepStrictEqual(aContentType.params, {
                param: 'charset="utf-8"; foo=bar',
                bar: 'foo'
            })
        })

    })

    describe('"toString" method', function () {

        it('should use "type" option', function () {
            const aContentType = new ContentType()
            aContentType.type = 'text/html'
            assert.strictEqual(aContentType.toString(), 'text/html')
        })

        it('should use "params" option', function () {
            const aContentType = new ContentType()
            aContentType.type = 'text/html'
            aContentType.params = {
                charset: 'utf-8',
                foo: 'bar'
            }
            assert.strictEqual(aContentType.toString(), 'text/html; charset=utf-8; foo=bar') 
        })

    })

})