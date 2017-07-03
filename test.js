const { manager } = require('leverage-js')
const http = require('./index')

const component = {
    __config__: {
        type: ['http'],
        http: {
            path: '/',
            method: 'get'
        }
    },
    http (req, res) {
        res.send('Howdy')
    }
}

const middleware = {
    __config__: {
        type: ['http'],
        http: {
            custom (app, server) {
                app.get('/ping', (req, res) => {
                    res.send('Pong!')
                })
            }
        }
    }
}

manager.plugin(http)

manager.middleware(middleware)

manager.add(component)

http.listen(3000)
