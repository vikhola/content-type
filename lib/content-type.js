'use strict';

const QESC_PATTERN = /\\([\u000b\u0020-\u00ff])/g
const VALUE_PATTERN = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
const TYPE_PATTERN = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/
const PARAM_PATTERN = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g

class ContentTypeError extends Error {

    constructor() {
        super(`ContentType isn\`t string or contain invalid characters.`)
    }

}

class ContentType {

    constructor(type = '', params = {}) {

        if(typeof type !== "string" || (type && !VALUE_PATTERN.test(type)))
            throw new ContentTypeError(type)

        this.type = type
        this.params = params
    }

    static from(header) {

        if (typeof header !== 'string') 
            return new ContentType()

        let key
        let match
        let value
        let index = header.indexOf(';')
        const params = {}
        const type = index !== -1
            ? header.slice(0, index).trim()
            : header.trim()

        if (!TYPE_PATTERN.test(type)) 
            return new ContentType()

        if(index === -1) 
            return new ContentType(type.toLowerCase(), params)

        PARAM_PATTERN.lastIndex = index

        while ((match = PARAM_PATTERN.exec(header))) {

            if (match.index !== index)
                return

            index += match[0].length
            key = match[1].toLowerCase()
            value = match[2]

            if (value[0] === '"') {
                value = value.slice(1, value.length - 1)
                QESC_PATTERN.test(value) && (value = value.replace(QESC_PATTERN, '$1'))
            }
            
            params[key] = value
        }

        if (index !== header.length)
            return new ContentType()

        return new ContentType(type.toLowerCase(), params)
    }

    toString() {
        let str = `${this.type}`
        for(const key in this.params)
            str += `; ${key}=${this.params[key]}`
        return str
    }

}

module.exports = { ContentType }
