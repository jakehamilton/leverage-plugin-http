# HTTP for [Leverage](http://github.com/jakehamilton/leverage)!

This is a plugin for Leverage that handles the `http` type of components.

<p align="center">
    <img src="https://img.shields.io/badge/leverage-plugin-blue.svg?style=for-the-badge">
    <img src="https://img.shields.io/npm/v/@leverage/plugin-http.svg?style=for-the-badge">
    <img src="https://img.shields.io/travis/jakehamilton/leverage-plugin-http.svg?style=for-the-badge">
    <img src="https://img.shields.io/coveralls/github/jakehamilton/leverage-plugin-http.svg?style=for-the-badge">
    <img src="https://img.shields.io/badge/semantic_release_🚀📦-enabled-brightgreen.svg?style=for-the-badge">
</p>

## HTTP Component

A HTTP Component has the following interface:

```typescript
import {
    ComponentUnit,
    ComponentInstance,
    ComponentConfig,
    ComponentConfigInstance,
} from '@leverage/core';

import { Express } from 'express';

export type Route = string | RegExp;

type HTTPCallback = (
    request: Express.Request,
    response: Express.Response,
) => void;

interface HTTPComponentConfig {
    http: {
        path: Route | Route[];
        method: string;
    };
}

export interface HTTPComponent extends ComponentUnit {
    config: ComponentConfig & HTTPComponentConfig;
    http: HTTPCallback;
}

export interface HTTPComponentInstance extends ComponentInstance {
    config: ComponentConfigInstance & HTTPComponentConfig;
    http: HTTPCallback;
}
```

## HTTP Middleware

A HTTP Middleware has the following interface:

```typescript
import * as http from 'http';
import { Express } from 'express';
import { MiddlewareInstance } from '@leverage/core';

export interface HTTPMiddleware extends MiddlewareInstance {
    http: (options: { app: Express.Application; server: http.Server }) => void;
}
```

## Example

```typescript
import { Manager } from '@leverage/core';
import {
    HTTP,
    HTTPComponent,
    HTTPMiddleware,
} from '@leverage/plugin-http';

const http = new HTTP();
const manager = new Manager();

const component: HTTPComponent = {
    is: 'component',
    type: 'http',
    config: {
        http: {
            path: '/',
            method: 'get',
        },
    },
    http (req, res) {
        res.send('Hello, World!');
    },
};

const middleware: HTTPMiddleware = {
    is: 'middleware',
    type: 'http',
    http ({ app }) {
        app.get('/middleware', (req, res) => {
            res.send('Hello, Custom Middleware!');
        });
    },
};

manager.add(http, component, middleware);

http.listen(8080);
```
