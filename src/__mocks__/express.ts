const instance = {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
};

const express = () => instance;

export default express;

export {
    instance,
};
