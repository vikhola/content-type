declare module "@vikhola/content-type" {

    export class ContentType {
        /**
         * ContentType accepts optional type and params which will be assigned to
         * the ContentType instance.
         * 
         * If type is not a string or contains invalid characters, an error is thrown.
         */
        constructor(type?: string, params?: { [key: string]: string });
        /**
         * The `contentType.type` is current Content-Type type.
         */
        type: string
        /**
         * The `contentType.params` a object that contains the current type parameters.
         */
        params: { [key: string]: string }
        /**
         * The `ContentType.from()` static method takes an HTTP Content-Type header, 
         * parses it, and returns a ContentType with type and params.
         * 
         * If the content type header is not a string or some parameters contain invalid characters, 
         * the ContentType instance will have an empty `type` property and an empty `params` object after initialization.
         */
        static from(header: string): ContentType
        /**
         * The `contentType.toString()` return a string representation suitable to be sent as HTTP header.
         */
        toString(): string
    }

}