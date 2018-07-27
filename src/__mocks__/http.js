const instance = {
    listen: jest.fn(),
};

function Server () {
    return instance;
}

module.exports = {
    instance,
    Server,
};
