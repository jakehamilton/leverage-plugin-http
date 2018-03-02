const instance = {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),

    use: jest.fn(),
};

const express = () => instance;
express.instance = instance;

module.exports = express;
