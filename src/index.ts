import {
    PluginUnit,
    ComponentInstanceWithDependencies,
    MiddlewareInstanceWithDependencies,
    ComponentConfigWithDependencies,
} from '@leverage/core';

// Import via `require` because es6 doesn't allow `import x = require('x')`
// tslint:disable-next-line:no-require-imports no-var-requires
const express = require('express');

export type Path = string | RegExp;

export interface HTTPComponent extends ComponentInstanceWithDependencies {
    config: ComponentConfigWithDependencies & {
        http: {
            path: Path | Path[];
            method: string;
        };
    };

    http: (request: Express.Request, response: Express.Response) => void;
}

export interface HTTPMiddleware extends MiddlewareInstanceWithDependencies {
    http: (app: Express.Application) => void;
}

export class HTTP implements PluginUnit {
    // well this isn't very good :(
    is: 'plugin' = 'plugin';
    config = {
        type: 'http',
    };

    app: Express.Application;

    constructor () {
        this.app = express();
    }

    http (component: HTTPComponent) {
        /*
         * Validate component config
         */
        if (!component.config.http) {
            throw new Error(
                `[HTTP] Expected \`component.config.http\` to exist on http component`,
            );
        }

        if (typeof component.config.http !== 'object') {
            throw new Error(
                // prettier-ignore
                `[HTTP] Expected \`component.config.http\` to be an object but got "${typeof component.config.http}"`,
            );
        }

        if (!component.config.http.path) {
            throw new Error(
                `[HTTP] Expected \`component.config.http.path\` to exist on http component`,
            );
        }

        if (
            typeof component.config.http.path !== 'string' &&
            !Array.isArray(component.config.http.path) &&
            typeof component.config.http.path !== 'object'
        ) {
            throw new Error(
                // prettier-ignore
                // tslint:disable-next-line:max-line-length
                `[HTTP] Expected \`component.config.http.path\` to be a string, array, or regex but got "${typeof component.config.http.path}"`,
            );
        }

        if (!component.config.http.method) {
            throw new Error(
                `[HTTP] Expected \`component.config.http.method\` to exist on http component`,
            );
        }

        if (typeof component.config.http.method !== 'string') {
            throw new Error(
                // prettier-ignore
                // tslint:disable-next-line:max-line-length
                `[HTTP] Expected \`component.config.http.method\` to be a string but got "${typeof component.config.http.method}"`,
            );
        }

        if (!component.http) {
            throw new Error(
                `[HTTP] Expected \`component.http()\` to exist on http component`,
            );
        }

        if (typeof component.http !== 'function') {
            throw new Error(
                `[HTTP] Expected \`component.http()\` to be a function but got "${typeof component.http}"`,
            );
        }

        /*
         * Install the component
         */
        const path = component.config.http.path;
        const method = component.config.http.method;
        const callback = component.http;

        this.app[method](path, callback.bind(component));
    }

    middleware (middleware: HTTPMiddleware) {
        if (!middleware.http) {
            throw new Error(
                `[HTTP] Expected \`middleware.http()\` to exist on http middleware`,
            );
        }

        if (typeof middleware.http !== 'function') {
            throw new Error(
                `[HTTP] Expected \`middleware.http()\` to be a function but got "${typeof middleware.http}"`,
            );
        }

        middleware.http(this.app);
    }

    listen (port: number) {
        if (port == null) {
            throw new Error(`[HTTP] Expected a port to listen on`);
        }

        if (typeof port !== 'number') {
            throw new Error(
                `[HTTP] Expected port to be a \`number\`, but got ${port}`,
            );
        }

        // Typings seem to think that `app.listen` doesn't exist...
        (this.app as any).listen(port);
    }
}

export default HTTP;
