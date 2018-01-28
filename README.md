<br>

<p align="center">
    <img src="https://raw.githubusercontent.com/jakehamilton/leverage/next/.md-assets/logo.png" width="120" height="120" alt="Leverage Logo">
</p>

<p align="center">
  <a href="https://coveralls.io/github/jakehamilton/leverage-plugin-http"><img src="https://coveralls.io/repos/github/jakehamilton/leverage-plugin-http/badge.svg" alt="Coverage Status"></a>
  <a href="https://travis-ci.org/jakehamilton/leverage-plugin-http"><img src="https://travis-ci.org/jakehamilton/leverage-plugin-http.svg" alt="Build Status"></a>
  <br>
  <a href="http://forthebadge.com"><img src="http://forthebadge.com/images/badges/makes-people-smile.svg" alt="forthebadge"></a>
  <a href="http://forthebadge.com"><img src="http://forthebadge.com/images/badges/built-with-love.svg" alt="forthebadge"></a>
</p>

HTTP for [`leverage`](https://github.com/jakehamilton/leverage)!
----------------------------------------------------------------

```bash
npm i -S @leverage/plugin-http
```

Hello World
-----------

For a "Hello World", we'll create a simple http server that responds to requests with a "Hello World".

First, install the HTTP plugin:

```bash
npm i -S @leverage/core @leverage/plugin-http
```

Now, we will write an HTTP component and load our component and the HTTP plugin:

```js
import { Manager } from '@leverage/core';
import http from '@leverage/plugin-http';

const manager = new Manager();

const route = {
    is: 'component',
    config: {
        type: 'http',
        http: {
            path: '/',
            method: 'get'
        }
    },

    http (request, response) {
        response.send('Hello World');
    }
}

manager.add(route);

http.listen(8080);
```

Want To Dig In Deeper?
----------------------

Check out [the wiki](https://github.com/jakehamilton/leverage/wiki)!

Learn from example applications:

+ *coming soon*

Roadmap
-------

Most (if not all) roadmap items are tracked on [the project board](https://github.com/jakehamilton/leverage/projects/2).
