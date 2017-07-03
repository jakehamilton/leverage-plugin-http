const { server, Plugin } = require('leverage-js')

class HTTP extends Plugin {
    constructor () {
        super()

        this.config = {
            type: 'http',
            http: {
                identifier (component) {
                    return `${component.__config__.http.method}@${component.__config__.http.path}`
                }
            }
        }

        this.listening = false
    }

    http (component) {
        server.extend(instance => {
            instance.verb(component.__config__.http.method, component.__config__.http.path, component.http)
        })
    }

    middleware (middleware) {
        server.extend((instance, app, http) => {
            if (middleware.__config__.http.express) {
                app.use.apply(app, middleware.__config__.http.express())
            }

            if (middleware.__config__.http.custom) {
                middleware.__config__.http.custom(app, http)
            }
        })
    }

    listen (port) {
        if (!this.listening) {
            this.listening = true

            server.listen(port)
        }
    }
}

module.exports = new HTTP()
