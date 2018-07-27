import {
    Plugin,
    PluginUnit,
    ComponentInstance,
    MiddlewareInstance,
    ComponentUnit,
    ComponentConfig,
    ComponentConfigInstance,
} from '@leverage/core';
import * as http from 'http';
import * as express from 'express';

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

export interface HTTPMiddleware extends MiddlewareInstance {
    http: (options: { app: Express.Application; server: http.Server }) => void;
}

export class HTTP extends Plugin implements PluginUnit {
    type = 'http';
    app = express();
    server = new http.Server(this.app);

    http (component: HTTPComponentInstance) {
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

        (this.app as any)[method](path, callback.bind(component));
    }

    middleware (middleware: MiddlewareInstance) {
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

        (middleware as HTTPMiddleware).http({
            app: this.app,
            server: this.server,
        });
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

        this.server.listen(port);
    }
}

export default HTTP;
