export default {
    /**
     * Functional method.
     * Takes an options object of HTTP options that will be commonly used for http calls in functions/components
     * Returns a function that will then assign the body parameter of the options object to be passed to fetch()
     * @param {object} options HTTP options for a fetch() instruction
     * @returns {function} function that takes the body as a parameter for the request object.
     */
    createHeader: options => body => Object.assign(
        {},
        options,
        {
            body: JSON.stringify(body)
        }
    )
}
