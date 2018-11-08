/** Utility functions for connecting to Express server that acts as go between with Mongo */
export default {
    BASE_URI: 'http://localhost',   // TODO: redirect to whatever service I deploy to.
    PORT: 12345,
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
    ),

    /**
     * Simple AJAX for fetching
     * @param {String} url url to hit
     * @param {Object} options defaults to empty, this function is best for GET anyways
     * @returns {Promise}
     */
    async ajax(url, options={}) { 
        return (await fetch(url, options)).json(); 
    },

    /**
     * Builds a URI string, defaulting to BASE_URI:PORT (http://localhost:{port})
     * If on local host, base uri will be forced to local host
     * Params is the list of path names in the uri
     * Query is an object of key/value pair objects
     * @param {Object} params  base uri, port, params
     * @returns {String} uriString
     */
    setURIString({ base = this.BASE_URI, port = this.PORT, params = null, query = null, frag = null }={}) {
        let uriString = `${base}`;
        if(port) {
			uriString += `:${port}`;
		}
        if(params) {
            params.forEach(param => uriString += `/${param}`);
        }
        if(query) {
            uriString += '?';
            Object.entries(query).forEach(([k,v], i, entries)=> {
                uriString += `${k}=${v}`;
                if(i != entries.length - 1) {
                    uriString += '&'
                }
            });
        }
        if(frag) {
            uriString += `#${frag}`
        }
        return uriString;
}
}
