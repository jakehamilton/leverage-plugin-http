const instance = {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),

    use: jest.fn(),
};

const express = () => instance;
(express as any).instance = instance;

export = express;
