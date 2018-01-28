import express from 'express';
import { ComponentInstanceWithDependencies, MiddlewareInstanceWithDependencies, PluginUnit, ComponentConfigWithDependencies, MiddlewareConfigWithDependencies } from '@leverage/core';

export interface HTTPComponent extends ComponentInstanceWithDependencies {
    config: ComponentConfigWithDependencies & {
        http: {
            path: string;
            method: string;
        };
    };

    http: (request: Express.Request, response: Express.Response) => void;
}

export interface HTTPMiddleware extends MiddlewareInstanceWithDependencies {
    http: (app: Express.Application) => void
}

class HTTP implements PluginUnit {
    is: 'plugin';
    config: {
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
            throw new Error(`[HTTP] Expected \`component.config.http\` to exist on http component`);
        }

        if (typeof component.config.http !== 'object') {
            throw new Error(`[HTTP] Expected \`component.config.http\` to be an object but got "${typeof component.config.http}"`);
        }

        if (!component.config.http.path) {
            throw new Error(`[HTTP] Expected \`component.config.http.path\` to exist on http component`);
        }

        if (typeof component.config.http.path !== 'string') {
            throw new Error(`[HTTP] Expected \`component.config.http.path\` to be a string but got "${typeof component.config.http.path}"`);
        }

        if (!component.config.http.method) {
            throw new Error(`[HTTP] Expected \`component.config.http.method\` to exist on http component`);
        }

        if (typeof component.config.http.method !== 'string') {
            throw new Error(`[HTTP] Expected \`component.config.http.method\` to be a string but got "${typeof component.config.http.method}"`);
        }

        if (!component.http) {
            throw new Error(`[HTTP] Expected \`component.http()\` to exist on http component`);
        }

        if (typeof component.http !== 'function') {
            throw new Error(`[HTTP] Expected \`component.http()\` to be a function but got "${typeof component.http}"`);
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
            throw new Error(`[HTTP] Expected \`middleware.http()\` to exist on http middleware`);
        }

        if (typeof middleware.http !== 'function') {
            throw new Error(`[HTTP] Expected \`middleware.http()\` to be a function but got "${typeof middleware.http}"`);
        }

        middleware.http(this.app);
    }
}

export default HTTP;
