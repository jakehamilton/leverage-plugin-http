HTTP for [Leverage](http://github.com/jakehamilton/leverage)!
=================

This plugin supports the `http` component and middleware types.

Config
------

```js
{
    path: 'a/b/c', // HTTP path as string
    method: 'get|post|delete|put|...', // Any express-supported HTTP method
}
```

Example
-------

```js
import { Component } from 'leverage-js'

class MyComponent extends Component {
  constructor () {
    super()

    this.config = {
      type: 'http',
      http: {
        /*
         * Specify a `path` and `method`
         */
        path: '/',
        method: 'get'
      }
    }
  }

  /*
   * Then the callback for our type. This is supplied with
   *  the `request` and `response` objects from express.
   */
  http (request, response) {
    response.send('Hello World')
  }
}
```

Then just make sure to add the plugin to Leverage's manager along with your component instance!

```js
import http from 'leverage-plugin-http'
import { manager } from 'leverage-js'

/* ... all the code from the previous example ... */

manager.plugin(http)

manager.add(new MyComponent) 

/*
 * Don't forget to listen on a port!
 */
http.listen(3000)
```
