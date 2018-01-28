jest.mock('express');

import HTTP, { HTTPComponent, HTTPMiddleware } from '..';
import { instance } from '../__mocks__/express';

describe('HTTP', () => {
    beforeEach(() => {
        instance.get.mockReset();
        instance.put.mockReset();
        instance.post.mockReset();
        instance.delete.mockReset();
    });

    describe('#constructor', () => {
        test('can create an instance', () => {
            expect(() => {
                // tslint:disable-next-line:no-unused-expression
                new HTTP();
            }).not.toThrow();
        });

        test('creates a new express instance', () => {
            expect(() => {
                const http = new HTTP();

                expect(http.app).not.toBeUndefined();

                expect(http.app).toBe(instance);
            }).not.toThrow();
        });
    });

    describe('#http', () => {
        test('installs http components', () => {
            const http = new HTTP();

            const component: HTTPComponent = {
                is: 'component',
                config: {
                    type: 'http',
                    http: {
                        path: '/',
                        method: 'get',
                    },
                    dependencies: {
                        plugins: ['http'],
                        services: [],
                    },
                },
                http: jest.fn(),
                plugins: [http] as any,
                services: [] as any,
            };

            expect(() => {
                http.http(component);
            }).not.toThrow();

            expect(instance.get.mock.calls.length).toBe(1);
            expect(instance.get.mock.calls[0][0]).toBe(component.config.http.path);
            expect(typeof instance.get.mock.calls[0][1]).toBe('function');
        });

        test('does not accept invalid components', () => {
            const http = new HTTP();

            expect(() => {
                http.http({
                    config: {},
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {},
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: true,
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: 42,
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        // tslint:disable-next-line:no-empty
                        http: () => {},
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            method: 'get',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: 'get',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: 42,
                            method: 'get',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: {},
                            method: 'get',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            // tslint:disable-next-line:no-empty
                            path: () => {},
                            method: 'get',
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: 42,
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: {},
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            // tslint:disable-next-line:no-empty
                            method: () => {},
                        },
                    },
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: 'get',
                        },
                    },
                    http: 42,
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: 'get',
                        },
                    },
                    http: {},
                } as any);
            }).toThrow();

            expect(() => {
                http.http({
                    config: {
                        http: {
                            path: '/',
                            method: 'get',
                        },
                    },
                    // tslint:disable-next-line:no-empty
                    http: [],
                } as any);
            }).toThrow();
        });
    });

    describe('#middleware', () => {
        test('installs http middleware', () => {
            const http = new HTTP();

            const middleware: HTTPMiddleware = {
                is: 'middleware',
                config: {
                    type: 'http',
                    dependencies: {
                        plugins: ['http'],
                        services: [],
                    },
                },
                http: jest.fn(),
                plugins: [http] as any,
                services: [] as any,
            };

            expect(() => {
                http.middleware(middleware);
            }).not.toThrow();

            expect((middleware.http as jest.Mock<{}>).mock.calls.length).toBe(1);
            expect((middleware.http as jest.Mock<{}>).mock.calls[0][0]).toBe(instance);
        });

        test('does not accept invalid http middleware', () => {
            const http = new HTTP();

            expect(() => {
                http.middleware({} as any);
            }).toThrow();

            expect(() => {
                http.middleware({
                    http: false,
                } as any);
            }).toThrow();

            expect(() => {
                http.middleware({
                    http: 42,
                } as any);
            }).toThrow();

            expect(() => {
                http.middleware({
                    http: 'tomato',
                } as any);
            }).toThrow();

            expect(() => {
                http.middleware({
                    http: {},
                } as any);
            }).toThrow();

            expect(() => {
                http.middleware({
                    http: [],
                } as any);
            }).toThrow();
        });
    });
});